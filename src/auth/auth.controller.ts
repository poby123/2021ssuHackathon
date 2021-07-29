import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/user/domain/user.entity';
import { SignupRequestDto } from 'src/user/dto/signupreq.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UserService) { }

    @Get('/signin')
    getSignin(@Res() res) {
        res.render('signin');
    }

    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    postSignin(@Req() req, @Res() res) {
        const { userId, username, points, auth } = req.user;

        req.session.userId = userId;
        req.session.username = username;
        req.session.points = points;
        req.session.auth = auth;

        res.redirect('/');
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
    postSignup(@Body() signupReqDto: SignupRequestDto, @Res() res) {
        const { userId, password, username } = signupReqDto;
        console.log(signupReqDto);


        const user: User = { userId, password, username }
        this.userService.saveUser(user);

        res.redirect('/auth/signin');
    }
}
