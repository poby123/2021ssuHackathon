import { SiDoEnum } from '../market.constant';

export class MarketReqDTo {

    marketId: string;
    marketName: string;
    describe?: string;
    maxNumber: number;
    approvedNumber?: number;
    sido?: SiDoEnum;
    longtitude?: string
    latitude?: string
}