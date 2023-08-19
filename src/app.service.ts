import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createuser.dto';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetDto } from './dtos/createTweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[]
  
  constructor(){
    this.users = [];
    this.tweets = []
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar)
    return this.users.push(user);
  }

  createTweet(body: CreateTweetDto) {
    const isLogged = this.findOneUser(body.username)
    if(isLogged){
      const tweet = new Tweet(body.username, body.tweet);
      this.tweets.push(tweet);
    } else {
      throw new HttpException('Not Authorized.', HttpStatus.UNAUTHORIZED)
    }
  }

  findOneUser(username: string) {
    return this.users.find((user: User) => user["username"] === username);
  }
}
