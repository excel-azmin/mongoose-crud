import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SalesInvoice } from 'src/sales-invoice/model/sales-invoice.class';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ isRequired: true })
  firstName: string;
  @Prop({ isRequired: true })
  lastName: string;
  @Prop()
  fullName: string;
  @Prop({ isRequired: true })
  email: string;
  @Prop({ type: String, default: null }) // This might store the path or filename of the uploaded image
  profileImage: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'SalesInvoice' }] }) // Array of SalesInvoice references
  salesInvoices: SalesInvoice[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', function (next) {
  this.fullName = this.firstName + this.lastName;
  next();
});
