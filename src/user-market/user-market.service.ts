import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMarket } from './domain/user-market.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class UserMarketService {

    constructor(@InjectRepository(UserMarket) private marketRepository: Repository<UserMarket>) { }


    findAll(): Promise<UserMarket[]> {
        return this.marketRepository.find();
    }


    findOne(id: number): Promise<UserMarket> {
        return this.marketRepository.findOne({ id });
    }


    async saveRecord(record: UserMarket): Promise<void> {
        await this.marketRepository.save(record);
    }


    async deleteMarket(id: number): Promise<void> {
        await this.marketRepository.delete({ id });
    }

}