import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Readable } from 'stream';
import { SemaphoreService } from './semaphore.service';
import { HealthService } from './health.service';
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

// Mock the middleware that enforces request limitation per user
jest.mock('./middleware/rate-limiter.middleware', () => ({
  YourMiddlewareClass: jest.fn().mockImplementation(() => ({
    use: (req, res, next) => {
      next();
    },
  })),
}));

describe('SemaphoreMiddleware (e2e)', () => {
  let app;
  let appService: AppService;

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

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, SemaphoreService, HealthService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it('Should return Service Unavailable when more than 5 concurrent requests are made', async () => {
    // Simulate more than 5 requests
    const requests = Array.from({ length: 6 }, (_, index) =>
      request(app.getHttpServer())
        .post('/upload')
        .set('Authorization', `Basic YWRtaW46YWRtaW4=`)
        .attach('file', createMockFile().buffer, createMockFile().originalname),
    );

    const responses = await Promise.all(requests);

    expect(responses[2].status).toBe(201);

    expect(responses[5].status).toBe(503);
    expect(responses[5].text).toBe('Service Unavailable');
  });
});
