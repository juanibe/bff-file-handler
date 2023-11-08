import { Injectable } from '@nestjs/common';
import { SemaphoreService } from './semaphore.service';

@Injectable()
export class AppService {
  constructor(private semaphoreService: SemaphoreService) {}

  async uploadFile(file: Express.Multer.File): Promise<void> {
    // Write some business logic with the Buffer... Example, upload to Bucket S3
    // ...
    // Realease a slot for future requests after processing
    this.semaphoreService.release();
    return;
  }
}
