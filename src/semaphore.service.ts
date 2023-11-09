import { Injectable } from '@nestjs/common';

@Injectable()
export class SemaphoreService {
  private slots: number = 5; // Initialize with 5 available slots

  async acquire() {
    if (this.slots > 0) {
      this.slots--;
      return true;
    } else {
      return false;
    }
  }

  release() {
    if (this.slots < 5) {
      this.slots++;
    }
  }

  getcount() {
    return this.slots;
  }
}
