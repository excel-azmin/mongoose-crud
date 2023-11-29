import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileUploadModule } from 'src/common/module/user-profile-upload.module';
import { UserSchema } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    FileUploadModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
