import { Body, Controller, Get, Post, Put, Req, Res, Session, UseGuards } from '@nestjs/common';
import { RolesEnum } from 'src/auth/contants';
import { SessionGuard } from 'src/auth/roles-session.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/user/domain/user.entity';
import { UserService } from 'src/user/user.service';
import { BoardService } from './board.service'
import { Board } from './domain/board.entity';
import { BoardSaveReqDto } from './dto/boardSaveReq.dto';

@Controller('board')
export class BoardController {

    // constructor(private readonly boardService: BoardService, private readonly userService: UserService) { }

    // @Get('/')
    // @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT)
    // @UseGuards(SessionGuard)
    // async getBoard(@Res() res) {
    //     const boards = await this.boardService.findAll();
    //     console.log(boards);
    // }

    // @Get('/write')
    // @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT)
    // @UseGuards(SessionGuard)
    // getWriteBoard(@Req() req, @Res() res) {
    //     res.render('board_post');
    // }

    // /* 구현 필요 */
    // @Post('/')
    // @Roles(RolesEnum.NORMAL_USER, RolesEnum.MARKET_USER, RolesEnum.GOVERNMENT)
    // @UseGuards(SessionGuard)
    // async postBoard(@Session() session, @Body() boardSaveReq: BoardSaveReqDto, @Res() res) {
    //     const id: string = session.userId;
    //     const { content } = boardSaveReq;
    //     const writer: User = await this.userService.findOne(id);

    //     const board: Board = {
    //         content,
    //         writer
    //     }

    //     await this.boardService.saveBoard(board);
    //     res.redirect('/board')
    // }
}