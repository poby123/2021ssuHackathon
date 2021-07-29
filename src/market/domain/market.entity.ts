import { UserMarket } from 'src/user-market/domain/user-market.entity';
import { User } from 'src/user/domain/user.entity';
import { Column, Entity, OneToMany, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm/index';
import { SiDoEnum } from '../market.constant';

@Entity("tbl_market")
export class Market {

    @PrimaryColumn()
    marketId: string;

    @Column()
    marketName: string;

    @Column({ default: '' })
    describe?: string;

    @Column()
    maxNumber: number;

    @Column({ default: 0 })
    currentNumber?: number;

    @Column()
    approvedNumber?: number;

    @Column({ nullable: true })
    sido?: SiDoEnum;

    @Column({ nullable: true })
    longtitude?: string

    @Column({ nullable: true })
    latitude?: string

    @Column({ default: true })
    isActive?: boolean

    @Column({ default: false })
    isRemoved?: boolean

    @OneToOne(() => User, user => user.market)
    admin?: User

    @OneToMany(() => UserMarket, record => record.market)
    record?: Array<UserMarket>
}