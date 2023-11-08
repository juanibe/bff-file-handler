import { Injectable } from '@nestjs/common';

@Injectable()
export class SemaphoreService {
  private semaphore: number = 5; // Initialize with 5 available slots

  async acquire() {
    if (this.semaphore > 0) {
      this.semaphore--;
      return true;
    } else {
      return false;
    }
  }

  release() {
    if (this.semaphore < 5) {
      this.semaphore++;
    }
  }

  getcount() {
    return this.semaphore;
  }
}
