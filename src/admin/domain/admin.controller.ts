import { Controller, Get, Req, Res } from "@nestjs/common";
import { Market } from "src/market/domain/market.entity";
import { MarketService } from "src/market/market.service";

@Controller('/admin')
export class AdminController {
    constructor(private readonly marketService: MarketService) { }

    @Get()
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