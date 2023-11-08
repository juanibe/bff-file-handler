import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HealthService } from './health.service';
import { HealthResponseDto } from './dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthService: HealthService,
  ) {}

  @Get('health')
  getHealth(): HealthResponseDto {
    return this.healthService.getHealthInfo();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          cb(null, `temp_${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  uploadFileCSV(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'text/csv' }),
          /* 50 * 1024 * 1024 = 50 MB */
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): any {
    return this.appService.uploadFile(file);
  }
}
