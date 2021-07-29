import { Controller, Get, Param, Query, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesDefaultRoutes, RolesEnum } from './auth/contants';
import { SessionGuard } from './auth/roles-session.guard';
import { Roles } from './auth/roles.decorator';
import { ViewAuthFilter } from './exception/forbidden-view.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT, RolesEnum.ADMIN)
  @UseGuards(SessionGuard)
  @UseFilters(ViewAuthFilter)
  index(@Req() req, @Res() res) {
    if (req.session.auth !== RolesEnum.NORMAL_USER) {
      res.redirect(RolesDefaultRoutes[req.session.auth])
    } else {
      res.render('index', { title: 'TEST TITLE' })
    }
  }

  @Get('/markets')
  @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT, RolesEnum.ADMIN)
  @UseGuards(SessionGuard)
  @UseFilters(ViewAuthFilter)
  getMarkets(@Query('marketId') marketId, @Res() res) {
    console.log(marketId);
    res.render('markets', { title: 'TEST TITLE' })
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
