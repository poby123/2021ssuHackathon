import { Controller, Get, Req, Res } from "@nestjs/common";
import { Market } from "src/market/domain/market.entity";
import { MarketService } from "src/market/market.service";

@Controller('/government')
export class GovernmentController {
    constructor(private readonly marketService: MarketService) { }

    @Get()
    async getIndex(@Req() req, @Res() res) {
        const allMarkets: Array<Market> = await this.marketService.findAll();
        const targetMarkets = allMarkets.map((market: Market) => {
            if (market.currentNumber > market.approvedNumber) {
                return market;
            }
        })

        console.log(targetMarkets);
    }
}