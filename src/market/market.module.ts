import { Module } from '@nestjs/common';
import { Market } from './domain/market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { UserModule } from 'src/user/user.module';
import { UserMarketModule } from 'src/user-market/user-market.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Market]), UserModule, UserMarketModule],
    controllers: [MarketController],
    providers: [MarketService],
    exports: [MarketService]
})
export class MarketModule { }
