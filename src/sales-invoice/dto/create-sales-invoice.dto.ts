import { ApiProperty } from '@nestjs/swagger';

export class CreateSalesInvoiceDto {
  @ApiProperty({
    example: 'Product ABC',
    description: 'The name of the item in the invoice.',
  })
  readonly itemName: string;

  @ApiProperty({
    example: 5,
    description: 'The quantity of the item in the invoice.',
  })
  readonly itemQty: number;

  @ApiProperty({
    example: 50.75,
    description: 'The price per unit of the item in the invoice.',
  })
  readonly itemPrice: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the customer associated with the invoice.',
  })
  readonly customer: string;

  @ApiProperty({
    example: '65658819e8ede616499608de', // Example of the user ID
    description: 'The ID of the user associated with the invoice.',
  })
  readonly user: string;
}
