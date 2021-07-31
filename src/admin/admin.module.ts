import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketModule } from 'src/market/market.module';
import { AdminController } from './domain/admin.controller';

@Module({
    imports:[MarketModule],
    controllers:[AdminController]
})
export class AdminModule {}
