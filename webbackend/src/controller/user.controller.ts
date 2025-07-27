import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { Context } from '@midwayjs/koa';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  /**
   * 用户注册接口
   */
  @Post('/register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    
    // 基本参数验证
    if (!username || !password) {
      return { code: 1, message: '用户名和密码不能为空' };
    }
    
    if (username.length < 3) {
      return { code: 1, message: '用户名至少3位' };
    }
    
    if (password.length < 6) {
      return { code: 1, message: '密码至少6位' };
    }

    const result = await this.userService.register(username, password);
    return {
      code: result.success ? 0 : 1,
      message: result.message,
      data: result.data
    };
  }

  /**
   * 用户登录接口
   */
  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    
    // 基本参数验证
    if (!username || !password) {
      return { code: 1, message: '用户名和密码不能为空' };
    }

    const result = await this.userService.login(username, password);
    if (result.success) {
      // 这里可以设置 session 或 JWT 等认证信息
      // this.ctx.session.user = result.data;
    }
    
    return {
      code: result.success ? 0 : 1,
      message: result.message,
      data: result.data
    };
  }
}