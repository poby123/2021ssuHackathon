import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from './domain/market.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class MarketService {

    constructor(@InjectRepository(Market) private marketRepository: Repository<Market>) { }


    findAll(): Promise<Market[]> {
        return this.marketRepository.find();
    }


    findOne(marketId: string): Promise<Market> {
        return this.marketRepository.findOne({ marketId });
    }


    async saveMarket(market: Market): Promise<void> {
        await this.marketRepository.save(market);
    }


    async deleteMarket(marketId: string): Promise<void> {
        await this.marketRepository.delete({ marketId });
    }

}