import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/domain/user.entity';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "1234",
        "database": "hack2021",
        "entities": [User],
        "synchronize": true // production 에서는 false로 해야한다. 안 그러면 데이터가 날아갈 수 있다.
      }
    ), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule { }
