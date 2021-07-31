import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, Session, UseFilters, UseGuards } from '@nestjs/common';
import { ViewAuthFilter } from 'src/exception/forbidden-view.filter';
import { User } from 'src/user/domain/user.entity';
import { SignupRequestDto } from 'src/user/dto/signupreq.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RolesDefaultRoutes, RolesEnum } from 'src/auth/contants';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/signin')
    async getSignin(@Session() session, @Res() res) {
        if (session.auth) {
            res.redirect(RolesDefaultRoutes[session.auth]);
        }
        else {
            res.render('signin');
        }
    }

    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    @UseFilters(ViewAuthFilter)
    postSignin(@Req() req, @Res() res) {
        const { userId, username, points, auth, market } = req.user;

        req.session.userId = userId;
        req.session.username = username;
        req.session.points = points;
        req.session.auth = auth;
        req.session.marketId = market && market.marketId;

        console.log(RolesDefaultRoutes[auth]);
        res.redirect(RolesDefaultRoutes[auth])
    }

    @Get('/signout')
    getSignout(@Req() req, @Res() res) {
        req.session.destroy((e: Error) => {
            if (e) {
                console.log(e);
            }
            res.redirect('/');
        })
    }

    @Get('/signup')
    getSignup(@Req() req, @Res() res) {
        res.render('signup');
    }

    @Post('/signup')
    async postSignup(@Body() signupReqDto: SignupRequestDto, @Res() res) {
        const { userId, password, username } = signupReqDto;

        // 중복체크로직
        const overlap = await this.userService.findOne(userId);
        if (overlap.length > 0) {
            throw new HttpException('이미 존재하는 아이디입니다', HttpStatus.BAD_REQUEST);
        }

        const user: User = { userId, password, username }
        await this.userService.saveUser(user);

        res.redirect('/auth/signin');
    }
}
