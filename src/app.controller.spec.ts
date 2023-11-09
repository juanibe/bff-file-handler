import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Readable } from 'stream';
import { readdirSync, unlinkSync } from 'fs';

function createMockFile(): Express.Multer.File {
  const file: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'mockFile.csv',
    encoding: '7bit',
    mimetype: 'text/csv',
    destination: './upload',
    filename: 'mockFile.csv',
    path: 'upload/mockFile.csv',
    size: 2586,
    buffer: Buffer.from('firstName,lastName'),
    stream: new Readable(),
  };
  return file;
}

// Mock the middleware that enforces request limitation per user, since I am not testing that functionality
jest.mock('./middleware/rate-limiter.middleware', () => ({
  YourMiddlewareClass: jest.fn().mockImplementation(() => ({
    use: (req, res, next) => {
      next();
    },
  })),
}));

// Mock the auth middleware
jest.mock('./middleware/auth.middleware', () => ({
  YourMiddlewareClass: jest.fn().mockImplementation(() => ({
    use: (req, res, next) => {
      next();
    },
  })),
}));

describe('SemaphoreMiddleware (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    /* Delete all the files after performing the tests */
    const dir = readdirSync('./upload');
    dir.forEach((file) => unlinkSync('./upload/' + file));
  });

  it('Should return Service Unavailable when more than 5 concurrent requests are made', async () => {
    /* Simulate more than 5 requests */
    const requests = Array.from({ length: 6 }, () =>
      request(app.getHttpServer())
        .post('/upload')
        .attach('file', createMockFile().buffer, createMockFile().originalname),
    );

    const responses = await Promise.all(requests);

    expect(responses[2].status).toBe(201);

    /* The sixth request should return Service Unavailable */
    expect(responses[5].status).toBe(503);
    expect(responses[5].text).toBe('Service Unavailable');
  });
});
