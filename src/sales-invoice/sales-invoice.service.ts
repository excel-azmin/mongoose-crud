import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SortOptions } from 'src/common/enum/enum-sort-options';
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

  async findAll(
    page: number = 1,
    limit: number = 10,
    order: string = 'createdAt',
    sort: SortOptions,
    search: string,
    fields: string,
  ) {
    let query = this.salesInvoiceModel.find();

    // Apply fields selection
    const selectFields = fields ? fields.split(',') : [];

    // Apply pagination
    const skip = (page - 1) * limit;

    // Apply search criteria if search term is provided
    if (search) {
      // Define your search criteria based on your requirements
      query = query.where(/* Define your search criteria here */);
    }

    // Apply all criteria to the query
    query = query
      .populate('user', 'fullName email _id')
      .select(
        selectFields.concat([
          'itemName',
          'itemQty',
          'itemPrice',
          'totalPrice',
          'customer',
          'createdAt',
          'updatedAt',
          'user',
          '_id',
        ]),
      )
      .skip(skip)
      .limit(limit);

    // Apply sorting based on the provided order field and sort direction
    const sortCriteria: Record<string, 'asc' | 'desc'> = {};

    console.log(sort);
    console.log(sortCriteria);

    query = query.sort(sort);

    const totalCount = await this.salesInvoiceModel
      .countDocuments(query.getFilter())
      .exec();
    const totalPages = Math.ceil(totalCount / limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const nextPage = hasNextPage ? Number(page) + 1 : totalPages;
    const prevPage = hasPrevPage ? page - 1 : 1;

    const result = await query.exec();

    return {
      data: result,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: Number(page),
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
      },
    };
  }

  async findAllByUserId(id: string) {
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
