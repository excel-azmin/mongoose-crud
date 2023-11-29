import { Injectable } from '@nestjs/common';
import { SalesInvoiceService } from 'src/sales-invoice/sales-invoice.service';
import { GetSalesReportDto } from './dto/get-sales-report.dto';

@Injectable()
export class SalesReportsService {
  constructor(private readonly salesInvoiceService: SalesInvoiceService) {}

  getReport(reportType: string, startDate: Date, endDate: Date) {
    return this.salesInvoiceService.getReport(reportType, startDate, endDate);
  }

  create(getSalesReportDto: GetSalesReportDto) {
    return 'This action adds a new salesReport';
  }

  findAll() {
    return `This action returns all salesReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesReport`;
  }

  update(id: number) {
    return `This action updates a #${id} salesReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesReport`;
  }
}
