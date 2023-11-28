import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesInvoiceModule } from './sales-invoice/sales-invoice.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SalesInvoiceModule,
    MongooseModule.forRoot('mongodb://root:example@localhost/mongoose_db', {
      authSource: 'admin',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
