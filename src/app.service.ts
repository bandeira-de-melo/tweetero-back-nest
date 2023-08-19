import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createuser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[];

  constructor(){
    this.users = []
  }
  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar)
    return this.users.push(user);
  }
}
