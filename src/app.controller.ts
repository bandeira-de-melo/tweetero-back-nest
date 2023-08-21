import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { CreateTweetDto } from './dtos/createTweet.dto';
import { QueryDto } from './dtos/query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  health(){
    return "I'm okay!"
  }

  @Post("sign-up")
  signUp(@Body() body: CreateUserDto) {
    this.appService.createUser(body);
    throw new HttpException('Ok', HttpStatus.OK)
  }

  @Post("tweets")
  createTweet(@Body() body: CreateTweetDto){
    this.appService.createTweet(body)
  }

  @Get("tweets")
  getTweets(@Query() page: QueryDto){
    if(page.page === undefined){
      return this.appService.getTweets(page.page)
    } else {
      return this.appService.getTweets(undefined);
    }
  }
  
  @Get("tweets/:username")
  getUserTweets(@Param('username') username: string) {
    return this.appService.getUserTweets(username)
  }
}
