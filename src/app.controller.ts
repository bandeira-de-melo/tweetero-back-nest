import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/createuser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("sign-up")
  signUp(@Body() body: CreateUserDto) {
    this.appService.createUser(body);
    throw new HttpException('Ok', HttpStatus.OK)
  }
}
