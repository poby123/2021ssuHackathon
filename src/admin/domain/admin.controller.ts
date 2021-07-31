import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { RolesEnum } from "src/auth/contants";
import { SessionGuard } from "src/auth/roles-session.guard";
import { Roles } from "src/auth/roles.decorator";
import { Market } from "src/market/domain/market.entity";
import { MarketService } from "src/market/market.service";

@Controller('/admin')
export class AdminController {
    constructor(private readonly marketService: MarketService) { }

    @Get()
    @Roles(RolesEnum.ADMIN)
    @UseGuards(SessionGuard)
    async getIndex(@Req() req, @Res() res) {
        const allMarkets: Array<Market> = await this.marketService.findAll();
        allMarkets.sort((a, b) => {
            if (a.approvedNumber < a.currentNumber) {
                return -1;
            }
            return 1;
        })

        res.render('admin', {
            allMarkets: allMarkets
        })
    }
}