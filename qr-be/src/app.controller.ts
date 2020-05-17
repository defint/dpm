import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from './product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getList() {
    return this.appService.getList();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getOne(id);
  }

  @Post()
  create(@Body() item: ProductDto) {
    return this.appService.createProduct(item);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() item: ProductDto,
  ) {
    return this.appService.editProduct(id, item);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.deleteProduct(id);
  }
}
