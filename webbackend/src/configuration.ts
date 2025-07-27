import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import * as typeorm from '@midwayjs/typeorm';
import * as cors from '@koa/cors'; 

@Configuration({
  imports: [
    koa,
    validate,
    typeorm,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // 添加 CORS 中间件，需要在其他中间件之前添加
    this.app.use(cors({
      origin: '*', // 或者指定具体的域名
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
    }));
    
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
  }
}