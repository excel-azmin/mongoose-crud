import { Module } from '@nestjs/common';
import { SalesInvoiceModule } from 'src/sales-invoice/sales-invoice.module';
import { SalesReportsController } from './sales-reports.controller';
import { SalesReportsService } from './sales-reports.service';

@Module({
  imports: [SalesInvoiceModule],
  controllers: [SalesReportsController],
  providers: [SalesReportsService],
})
export class SalesReportsModule {}
