import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMarket } from './domain/user-market.entity';
import { UserMarketService } from './user-market.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserMarket])],
    providers: [UserMarketService],
    exports: [UserMarketService]
})
export class UserMarketModule {}
