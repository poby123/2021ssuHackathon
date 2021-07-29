import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './domain/board.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Board]), UserModule],
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule { }
