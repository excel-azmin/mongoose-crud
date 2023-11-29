import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';

import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SalesReportsList } from 'src/common/enum/enum-sales-reports';
import { SalesReportsService } from './sales-reports.service';

@Controller('sales-reports')
@ApiTags('Sales Reports')
export class SalesReportsController {
  constructor(private readonly salesReportsService: SalesReportsService) {}
  @Get()
  @ApiOperation({
    summary: 'Get Sales Report',
    description: 'Get sales report details',
  })
  @ApiQuery({
    name: 'reportType',
    enum: SalesReportsList,
    required: true,
  })
  @ApiQuery({ name: 'Start Date', type: Date, required: true })
  @ApiQuery({ name: 'End Date', type: Date, required: true })
  getReport(
    @Query('reportType') reportType: string,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
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
