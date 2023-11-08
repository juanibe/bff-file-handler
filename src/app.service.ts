import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File): Promise<void> {
    // Write some business logic with the Buffer... Example, upload to Bucket S3
    return;
  }
}
