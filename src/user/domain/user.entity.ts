import { RolesEnum } from 'src/auth/contants';
import { Board } from 'src/board/domain/board.entity';
import { Market } from 'src/market/domain/market.entity';
import { UserMarket } from 'src/user-market/domain/user-market.entity';
import { Column, Entity, OneToMany, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm/index';

@Entity("tbl_user")
export class User {

    @PrimaryColumn()
    userId: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({ default: 0 })
    points?: number;

    @Column({ default: RolesEnum.NORMAL_USER })
    auth?: RolesEnum;

    @Column({ default: true })
    isActive?: boolean

    @Column({ default: false })
    isRemoved?: boolean

    @OneToOne(() => Market, market => market.admin, { cascade: true })
    @JoinColumn()
    market?: Market

    @OneToMany((type) => Board, (board) => board.writer)
    boards?: Array<Board>;

    @OneToMany(type => UserMarket, record => record.user)
    record?: Array<UserMarket>
}