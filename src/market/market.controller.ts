import { Controller, Get, Post, Body, Put, Query, Req, Res, Session, UseGuards, UseFilters } from '@nestjs/common';
import { RolesEnum } from 'src/auth/contants';
import { SessionGuard } from 'src/auth/roles-session.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserMarket } from 'src/user-market/domain/user-market.entity';
import { UserMarketService } from 'src/user-market/user-market.service';
import { UserService } from 'src/user/user.service';
import { Market } from './domain/market.entity';
import { MarketReqDTo } from './dto/marketReq.dto';
import { MarketService } from './market.service';
import { ViewAuthFilter } from '../exception/forbidden-view.filter';

@Controller('market')
export class MarketController {

    constructor(
        private readonly marketService: MarketService,
        private readonly userService: UserService,
        private readonly userMarketService: UserMarketService,
    ) { }

    @Get()
    // @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT, RolesEnum.ADMIN)
    // @UseGuards(SessionGuard)
    // @UseFilters(ViewAuthFilter)
    async getMarkets(@Query('marketId') marketId, @Res() res) {
        // console.log('query market id :', marketId);

        const findResult = await this.marketService.findAll();
        // console.log('findResult : ', findResult);

        res.render('markets', { title: 'TEST TITLE' })
    }


    @Get('/qr')
    @Roles(RolesEnum.MARKET_USER)
    @UseGuards(SessionGuard)
    getQR(@Res() res) {
        res.render('qr_scanner')
    }


    @Get('/qrtest')
    // @Roles(RolesEnum.MARKET_USER)
    // @UseGuards(SessionGuard)
    async postQR(@Req() req, @Res() res) {
        // const { marketId } = req.session;
        const marketId = "1234"
        const user = await this.userService.findOneWith('userid3');
        const market = await this.marketService.findOne(marketId);

        // console.log('session : ', marketId);
        // console.log(user);
        // console.log(market);

        const record: UserMarket = { user, market }
        const result = await this.userMarketService.findByUser(user.userId);

        // console.log('findByUser REsult : ', result);

        // entrance
        if (result === undefined) {
            await this.userMarketService.saveRecord(record);
            market.currentNumber = market.currentNumber + 1;
            await this.marketService.saveMarket(market);
        }

        // exit
        else {
            market.currentNumber = market.currentNumber - 1;
            result.exitTime = new Date();
            await this.userMarketService.saveRecord(result);
            await this.marketService.saveMarket(market);
        }
    }


    @Get('/add')
    @Roles(RolesEnum.NORMAL_USER)
    @UseGuards(SessionGuard)
    getAdd(@Session() session, @Res() res) {
        res.render('market_add');
    }

    @Post('/add')
    @Roles(RolesEnum.NORMAL_USER)
    @UseGuards(SessionGuard)
    async postAdd(@Session() session, @Body() dto: MarketReqDTo, @Res() res) {
        const adminId = session.userId;
        const admin = await this.userService.findOneWith(adminId);
        if (!dto.approvedNumber) {
            dto.approvedNumber = Math.floor(dto.maxNumber / 10);
        }
        console.log(dto);
        const market: Market = { ...dto, admin }

        await this.marketService.saveMarket(market);
        const markets = await this.marketService.findAll();
        console.log(markets);
    }
}