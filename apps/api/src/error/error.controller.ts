import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CodeService } from './code.service';
import { CreateCodeDto } from './model/error.dto';
import { ensureUploadPath, SourceService, uploadPath } from './source.service';

const storage = diskStorage({
  destination(req, file, cb) {
    ensureUploadPath();
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

@Controller('error')
export class ErrorController {
  constructor(
    private codeService: CodeService,
    private sourceService: SourceService,
  ) {}

  @Get('code')
  findAllCode() {
    return this.codeService.findAll();
  }

  @Post('code')
  createOneCode(@Body() dto: CreateCodeDto) {
    return this.codeService.createOne(dto);
  }

  @Post('uploadSourceMap')
  @UseInterceptors(
    FileInterceptor('files', {
      storage,
    }),
  )
  uploadSource() {}

  @Get('getMap')
  findMap(@Query('fileName') fileName: string) {
    return this.sourceService.findMap(fileName);
  }

  @Delete('clearMap')
  clearMap() {
    this.sourceService.clearMap();
  }

  @Get('export')
  async export() {
    return await this.sourceService.export();
  }
}
