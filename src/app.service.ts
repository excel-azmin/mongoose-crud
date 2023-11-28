import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('healt-check')
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
