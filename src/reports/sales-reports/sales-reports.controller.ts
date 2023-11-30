import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SalesReportsList } from 'src/common/enum/enum-sales-reports';
import { SalesReportsService } from './sales-reports.service';

@Controller('sales-reports')
@ApiTags('Sales Reports')
export class SalesReportsController {
  constructor(private readonly salesReportsService: SalesReportsService) {}

  @Get()
  @ApiQuery({
    name: 'reportType',
    enum: SalesReportsList,
    required: true,
  })
  @ApiQuery({
    name: 'startDate',
    type: Date,
    required: true,
    example: '2023-11-01',
  })
  @ApiQuery({
    name: 'endDate',
    type: Date,
    required: true,
    example: '2023-11-30',
  })
  getReport(
    @Query('endDate') endDate: Date,
    @Query('startDate') startDate: Date,
    @Query('reportType') reportType: string,
  ) {
    return this.salesReportsService.getReport(reportType, startDate, endDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.salesReportsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesReportsService.remove(+id);
  }
}
