import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMarket } from './domain/user-market.entity';
import { Repository } from 'typeorm/index';
import { UserService } from 'src/user/user.service';
import { MarketService } from 'src/market/market.service';
import { Market } from 'src/market/domain/market.entity';
import { User } from 'src/user/domain/user.entity';

@Injectable()
export class UserMarketService {

    constructor(
        @InjectRepository(UserMarket) private marketRepository: Repository<UserMarket>
    ) { }


    findAll(): Promise<UserMarket[]> {
        return this.marketRepository.find();
    }


    findOne(id: number): Promise<UserMarket> {
        return this.marketRepository.findOne({ id });
    }

    async findByUser(userId: string) {
        const result = await this.marketRepository.find({ relations: ["user"] });
        return result.find((userMarket) => {
            if (userMarket.user.userId == userId && userMarket.exitTime == null) {
                return true;
            }
        })
    }

    async saveRecord(record: UserMarket): Promise<void> {
        await this.marketRepository.save(record);
    }


    async saveRecord2(user: User, market: Market): Promise<Market> {
        const findRecord = await this.findByUser(user.userId);

        // entrance
        if (findRecord === undefined) {
            await this.marketRepository.save({ user, market });
            market.currentNumber = market.currentNumber + 1;
            return market;
        }

        // exit
        else {
            market.currentNumber = market.currentNumber - 1;
            findRecord.exitTime = new Date();
            await this.marketRepository.save(findRecord);
            return market;
        }
    }


    async deleteMarket(id: number): Promise<void> {
        await this.marketRepository.delete({ id });
    }

}