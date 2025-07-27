import { Provide } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';

@Provide()
export class UserService {
  
  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 用户注册
   * @param username 用户名
   * @param password 密码
   */
  async register(username: string, password: string): Promise<{ success: boolean; message: string; data?: any }> {
    // 检查用户名是否已存在
    const existingUser = await this.userModel.findOne({ where: { username } });
    if (existingUser) {
      return { success: false, message: '用户名已存在' };
    }

    // 创建新用户
    const newUser = new User();
    newUser.username = username;
    newUser.password = password; // 注意：这里没有加密密码，实际项目中需要加密
    
    try {
      const savedUser = await this.userModel.save(newUser);
      return { 
        success: true, 
        message: '注册成功', 
        data: { 
          id: savedUser.id, 
          username: savedUser.username 
        } 
      };
    } catch (error) {
      return { success: false, message: '注册失败: ' + error.message };
    }
  }

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   */
  async login(username: string, password: string): Promise<{ success: boolean; message: string; data?: any }> {
    // 查找用户
    const user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      return { success: false, message: '用户不存在' };
    }

    // 验证密码
    if (user.password !== password) {
      return { success: false, message: '密码错误' };
    }

    return { 
      success: true, 
      message: '登录成功', 
      data: { 
        id: user.id, 
        username: user.username 
      } 
    };
  }

  /**
   * 根据用户名查找用户
   * @param username 用户名
   */
  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ where: { username } });
  }

  async getUser(options: { uid: number }): Promise<User | null> {
    const { uid } = options;
    return await this.userModel.findOne({ where: { id: uid } });
  }
}