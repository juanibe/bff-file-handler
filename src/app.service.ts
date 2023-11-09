import { HttpException, Injectable } from '@nestjs/common';
import { SemaphoreService } from './semaphore.service';

@Injectable()
export class AppService {
  constructor(private semaphoreService: SemaphoreService) {}

  /**
   * @param file
   * @returns {void}
   */
  async uploadFile(file: Express.Multer.File): Promise<void> {
    try {
      if (file) console.log(`> Processing file ${file.originalname}...`);
      // Realease a slot for future requests after processing
      this.semaphoreService.release();
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
