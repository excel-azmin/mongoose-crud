import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SortOptions } from 'src/common/enum/enum-sort-options';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';
import { SalesInvoiceService } from './sales-invoice.service';

@Controller('sales-invoice')
@ApiTags('Sales Invoice')
export class SalesInvoiceController {
  constructor(private readonly salesInvoiceService: SalesInvoiceService) {}

  @Post()
  async create(@Body() createSalesInvoiceDto: CreateSalesInvoiceDto) {
    return await this.salesInvoiceService.create(createSalesInvoiceDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiQuery({
    name: 'order',
    type: String,
    required: false,
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sort',
    enum: SortOptions,
    required: false,
    example: 'desc',
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    example: 'keyword',
  })
  @ApiQuery({
    name: 'fields',
    type: String,
    required: false,
    example: 'itemName,itemPrice',
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: string = 'createdAt',
    @Query('sort') sort: SortOptions = SortOptions.DESC,
    @Query('search') search: string,
    @Query('fields') fields: string,
  ) {
    return this.salesInvoiceService.findAll(
      page,
      limit,
      order,
      sort,
      search,
      fields,
    );
  }

  @Get('/user-invoice/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.salesInvoiceService.findAllByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesInvoiceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalesInvoiceDto: UpdateSalesInvoiceDto,
  ) {
    return this.salesInvoiceService.update(+id, updateSalesInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesInvoiceService.remove(+id);
  }
}
