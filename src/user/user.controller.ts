import { Controller, Get, Session, Res, UseGuards, UseFilters } from '@nestjs/common';
import { RolesDefaultRoutes, RolesEnum } from '../auth/contants';
import { SessionGuard } from '../auth/roles-session.guard';
import { Roles } from '../auth/roles.decorator';
import { ViewAuthFilter } from 'src/exception/forbidden-view.filter';

@Controller('user')
export class UserController {

    @Get()
    @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT, RolesEnum.ADMIN)
    @UseGuards(SessionGuard)
    @UseFilters(ViewAuthFilter)
    async getUser(@Session() session, @Res() res) {
        res.render('userIndex');
    }

}
