import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesReportsModule } from './reports/sales-reports/sales-reports.module';
import { SalesInvoiceModule } from './sales-invoice/sales-invoice.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SalesInvoiceModule,
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27011/mongoose_db',
      {
        authSource: 'admin',
      },
    ),
    UserModule,
    SalesReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
