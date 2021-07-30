import { User } from 'src/user/domain/user.entity';
import { Market } from 'src/market/domain/market.entity';
import { Column, Entity, OneToMany, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, ManyToOne } from 'typeorm/index';

@Entity('tbl_user_market')
export class UserMarket {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => User, user => user.record)
    user: User

    @ManyToOne(type => Market, market => market.record)
    market: Market

    @CreateDateColumn()
    entranceTime?: Date

    @Column({ type: "timestamp", nullable: true })
    exitTime?: Date

    @Column({ default: true })
    isActivate?: boolean;
}