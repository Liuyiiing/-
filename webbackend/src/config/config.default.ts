import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1753617136767_4308',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: ':memory:', // 或者指定一个文件路径如 './database.sqlite'
        synchronize: true,
        logging: false,
        entities: ['**/entity/*.entity{.ts,.js}'],
        migrations: ['**/migrations/*.ts'],
        subscribers: ['**/subscriber/*.ts']
      }
    }
  }
} as MidwayConfig;
