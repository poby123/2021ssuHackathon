import { Injectable } from "@nestjs/common";
import { Board } from "./domain/board.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board) private readonly boardRepository: Repository<Board>) { }

    findAll(): Promise<Board[]> {
        return this.boardRepository.find();
    }


    findOne(bno: number): Promise<Board> {
        return this.boardRepository.findOne({ bno });
    }


    async saveBoard(board: Board): Promise<void> {
        await this.boardRepository.save(board);
    }


    async deleteBoard(bno: number): Promise<void> {
        await this.boardRepository.delete({ bno });
    }
}