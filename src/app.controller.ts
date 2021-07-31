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
  index(@Req() req, @Res() res) {
    if (req.session.auth) {
      res.redirect(RolesDefaultRoutes[req.session.auth])
    } else {
      res.render('index', { title: 'TEST TITLE' })
    }
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
