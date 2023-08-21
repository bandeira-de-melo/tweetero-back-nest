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
    console.log(typeof(page.page))
    if(page === undefined){
      return `All tweets`;
    } else {
      return 'this.getTweets(page)';
    }
  }
  
  @Get("tweets/:username")
  getUserTweets(@Param('username') username: string) {
    return this.appService.getUserTweets(username)
  }
}
