import { Body, Controller, Get, Post, Response, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ISignIn, ISignUp } from './types';
import { Status } from '../files/types';
import { JwtService } from '@nestjs/jwt';

const userPayload = userId => ({ username: userId, sub: userId })


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  @Post('/signIn')
  async signIn(@Body() signIn: ISignIn) {
    const userId = await this.userService.loginUser(signIn.email, signIn.password)
    return {
      access_token: this.jwtService.sign(userPayload(userId)),
    };
  }

  @Post('/signUp')
  async signUp(@Body() signUp: ISignUp) {
    const userId = await this.userService.createUser(signUp.email, signUp.password)
    return {
      access_token: this.jwtService.sign(userPayload(userId)),
    };
  }
}
