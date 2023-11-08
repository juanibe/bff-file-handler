import { Injectable } from '@nestjs/common';
import { SemaphoreService } from './semaphore.service';

@Injectable()
export class AppService {
  constructor(private semaphoreService: SemaphoreService) {}

  async uploadFile(file: Express.Multer.File): Promise<void> {
    if (file) console.log(`> Processing file ${file.originalname}...`);
    // Realease a slot for future requests after processing
    this.semaphoreService.release();
    return;
  }
}
