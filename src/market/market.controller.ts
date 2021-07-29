import { Controller, Get, Post, Body, Put, Req, Res, Session, UseGuards } from '@nestjs/common';
import { RolesEnum } from 'src/auth/contants';
import { SessionGuard } from 'src/auth/roles-session.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserMarket } from 'src/user-market/domain/user-market.entity';
import { UserMarketService } from 'src/user-market/user-market.service';
import { UserService } from 'src/user/user.service';
import { Market } from './domain/market.entity';
import { MarketReqDTo } from './dto/marketReq.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {

    constructor(
        private readonly marketService: MarketService,
        private readonly userService: UserService,
        private readonly userMarketService: UserMarketService,
    ) { }

    @Get('/qr')
    @Roles(RolesEnum.MARKET_USER)
    @UseGuards(SessionGuard)
    getQR(@Res() res) {
        res.render('qr_scanner')
    }


    @Get('/qrtest')
    @Roles(RolesEnum.MARKET_USER)
    @UseGuards(SessionGuard)
    async postQR(@Req() req, @Res() res) {
        const { marketId } = req.session;
        const user = await this.userService.findOne('userid');
        const market = await this.marketService.findOne(marketId);

        console.log('session : ', marketId);

        console.log(user);
        console.log(market);

        const record: UserMarket = { user, market }
        this.userMarketService.saveRecord(record);

        console.log(record);
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
        const admin = await this.userService.findOne(adminId);
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