import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/domain/user.entity';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { MarketModule } from './market/market.module';
import { Market } from './market/domain/market.entity';
import { UserMarketModule } from './user-market/user-market.module';
import { BoardModule } from './board/board.module';
import { Board } from './board/domain/board.entity';
import { UserMarket } from './user-market/domain/user-market.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": process.env.dbhost || "localhost",
        "port": 3306,
        "username": process.env.dbusername || "root",
        "password": process.env.dbpassword || "1234",
        "database": process.env.dbdatabase || "hack2021",
        "entities": [User, Market, Board, UserMarket],
        "synchronize": true // production 에서는 false로 해야한다. 안 그러면 데이터가 날아갈 수 있다.
      }
    ), AuthModule, UserModule, MarketModule, UserMarketModule, BoardModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule { }
