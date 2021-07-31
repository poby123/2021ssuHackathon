import { SiDoEnum } from '../market.constant';

export class MarketReqDTo {

    userId: string;
    password: string;
    username: string;

    marketId: string;
    marketName: string;
    address: string;
    describe: string;

    longtitude?: string;
    latitude?: string;
}