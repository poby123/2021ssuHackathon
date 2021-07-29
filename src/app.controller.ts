import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionGuard } from './auth/session.guard';
import { ViewAuthFilter } from './exception/forbidden-view.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(SessionGuard)
  @UseFilters(ViewAuthFilter)
  index(@Req() req, @Res() res) {
    res.render('index', { title: 'TEST TITLE' })
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
