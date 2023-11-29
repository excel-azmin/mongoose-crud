import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesInvoiceSchema } from './model/sales-invoice.class';
import { SalesInvoiceController } from './sales-invoice.controller';
import { SalesInvoiceService } from './sales-invoice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SalesInvoice', schema: SalesInvoiceSchema },
    ]),
  ],
  controllers: [SalesInvoiceController],
  providers: [SalesInvoiceService],
  exports: [SalesInvoiceService],
})
export class SalesInvoiceModule {}
