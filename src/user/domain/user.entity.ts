import { Auths } from 'src/auth/contants';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm/index';

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

    @Column({ default: Auths.NORMAL_USER })
    auth?: Auths;

    @Column({ default: true })
    isActive?: boolean
}