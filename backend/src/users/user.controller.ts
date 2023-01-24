import { Body, Controller, Get, Post, Response, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ISignIn, ISignUp } from './types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signIn')
  async signIn(@Body() signIn: ISignIn, @Response() res): Promise<void> {
    const userId = await this.userService.createUser(signIn.email, signIn.password)
    res.cookie('userId',userId, { maxAge: 900000, httpOnly: true });
  }

  @Post('/signUp')
  async signUp(@Body() signUp: ISignUp, @Response() res): Promise<void> {
    const userId = await this.userService.loginUser(signUp.email, signUp.password)
    res.cookie('userId',userId, { maxAge: 900000, httpOnly: true });
  }

  @Post('/logout')
  async logout(@Response() res): Promise<void> {
    res.cookie('userId',null, { maxAge: 900000, httpOnly: true });
  }

  @Get('/isLogin')
  async isLogin(@Request() req): Promise<{isLogin: boolean}> {
    // return this.appService.getHello();
    const userId = req.cookies.vc
    return {isLogin: !!userId}
  }
}
