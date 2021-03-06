import { Controller, Get, Post, Body, Put, Query, Req, Res, Session, UseGuards, UseFilters, HttpStatus, HttpException } from '@nestjs/common';
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
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('market')
export class MarketController {

    constructor(
        private readonly marketService: MarketService,
        private readonly userService: UserService,
        private readonly userMarketService: UserMarketService,
    ) { }

    @Get()
    async getMarkets(@Res() res) {
        const mapData = await this.marketService.findAll();
        res.render('markets', { title: 'TEST TITLE', mapData })
    }


    @Get('/qr')
    @Roles(RolesEnum.MARKET_USER)
    @UseGuards(SessionGuard)
    getQR(@Res() res) {
        res.render('qr_scanner')
    }


    @Post('/qr')
    @Roles(RolesEnum.MARKET_USER)
    @UseGuards(SessionGuard)
    async postQR(@Session() session, @Body() body, @Res() res) {
        const user = await this.userService.findOneWith(body.user);
        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({ sucess: false })
            return;
        }

        const market = await this.marketService.findOne(session.marketId);

        const updatedMarket = await this.userMarketService.saveRecord2(user, market);
        await this.marketService.saveMarket(updatedMarket);

        res.json({ sucess: true })
    }

    @Get('/qrtest')
    // @Roles(RolesEnum.MARKET_USER)
    // @UseGuards(SessionGuard)
    async qrtest(@Req() req, @Res() res) {
        try {

            // const { marketId } = req.session;
            const marketId = "1234"
            const user = await this.userService.findOneWith('userid3');
            const market = await this.marketService.findOne(marketId);

            const updatedMarket = await this.userMarketService.saveRecord2(user, market);
            await this.marketService.saveMarket(updatedMarket);

        } catch (e) {
            throw new HttpException("error is occured at /market/qrtest", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('/add')
    getAdd(@Session() session, @Res() res) {
        res.render('market_add');
    }

    @Post('/add')
    async postAdd(@Body() dto: MarketReqDTo, @Res() res) {
        const { userId, username, password, ...marketInfo } = dto;

        // ?????? ?????? ?????? : ????????? service ???????????? ???????????????
        const checkUserExist = await this.userService.findOne(userId);
        if (checkUserExist.length > 0) {
            res.render('error', { errorCode: HttpStatus.BAD_REQUEST, errorMessage: '?????? ?????? ??????????????????.' });
            return;
        }

        const checkMarketExist = await this.marketService.findOne(marketInfo.marketId);
        if (checkMarketExist) {
            res.render('error', { errorCode: HttpStatus.BAD_REQUEST, errorMessage: '?????? ?????? ???????????????.' });
            return;
        }

        // ?????? ??????
        await this.marketService.saveMarket(marketInfo);
        const savedMarket = await this.marketService.findOne(marketInfo.marketId);

        const admin = { userId, username, password, market: savedMarket, auth: RolesEnum.MARKET_USER };
        await this.userService.saveUser(admin);

        res.redirect('/auth/signin');
    }
}