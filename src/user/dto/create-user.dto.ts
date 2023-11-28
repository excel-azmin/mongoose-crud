import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  readonly lastName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user.',
  })
  readonly email: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  profileImage: Express.Multer.File; // File upload field
}
