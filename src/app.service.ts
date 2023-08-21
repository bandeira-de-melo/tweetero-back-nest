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
    this.users = []
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

  getTweets(page: number | undefined){
    if(page){
      return this.tweets.slice(-1, -15);
    }
    
  }

  getUserTweets(username: string) {
    const user = this.findOneUser(username)
    if(!user) return []
    const posts = this.tweets.filter(tweet => tweet["username"] === username)
    const tweets = posts.map((post) => { return { username: post["username"], avatar: user["avatar"], tweet: post["tweet"]}})
    return tweets;
  }

  findOneUser(username: string) {
    return this.users.find((user: User) => user["username"] === username);
  }
}
