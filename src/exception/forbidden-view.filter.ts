import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException)
export class ViewAuthFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response.render('error', { errorMessage: '잘못된 아이디 혹은 패스워드입니다.', errorCode: HttpStatus.FORBIDDEN });
    }
}