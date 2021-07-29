import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExceptionModule } from './exception/exception.module';
import { User } from './user/domain/user.entity';
import { UserModule } from './user/user.module';

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
  ), AuthModule, ExceptionModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
