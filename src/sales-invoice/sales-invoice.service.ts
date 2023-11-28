import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';
import { SalesInvoice } from './model/sales-invoice.class';

@Injectable()
export class SalesInvoiceService {
  constructor(
    @InjectModel(SalesInvoice.name)
    private readonly salesInvoiceModel: Model<SalesInvoice>,
  ) {}

  async create(
    createSalesInvoiceDto: CreateSalesInvoiceDto,
  ): Promise<SalesInvoice> {
    const createdInvoice = new this.salesInvoiceModel(createSalesInvoiceDto);

    return await createdInvoice.save();
  }

  async findAll() {
    return await this.salesInvoiceModel
      .find()
      .populate('user', 'fullName + email +_id')
      .select(
        'itemName + itemQty + itemPrice + totalPrice + customer + createdAt + updatedAt + user +_id',
      );
  }

  async findAllByUserId(id: string) {
    console.log(id);
    const result = await this.salesInvoiceModel
      .find({ user: new Types.ObjectId(id) })
      .populate('user', 'fullName + email -_id')
      .select(
        'itemName itemQty itemPrice customer createdAt updatedAt user _id',
      );

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesInvoice`;
  }

  update(id: number, updateSalesInvoiceDto: UpdateSalesInvoiceDto) {
    return `This action updates a #${id} salesInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesInvoice`;
  }
}
