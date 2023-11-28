import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SalesInvoice extends Document {
  @Prop({ required: true })
  itemName: string;
  @Prop({ required: true })
  itemQty: number;
  @Prop({ required: true })
  itemPrice: number;
  @Prop()
  totalPrice: number;
  @Prop({ required: true })
  customer: string;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const SalesInvoiceSchema = SchemaFactory.createForClass(SalesInvoice);
SalesInvoiceSchema.pre<SalesInvoice>('save', function (next) {
  this.totalPrice = this.itemQty * this.itemPrice;
  this.user = new Types.ObjectId(this.user);
  next();
});
