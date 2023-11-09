import { Injectable } from '@nestjs/common';
import * as os from 'os';
import { HealthResponseDto } from './dto';

@Injectable()
export class HealthService {
  getHealthInfo(): HealthResponseDto {
    const cpuUsage = os.loadavg()[0]; // Get 1-minute CPU load average
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    return {
      cpuUsage,
      totalMemory,
      freeMemory,
    };
  }
}
