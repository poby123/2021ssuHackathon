import { User } from 'src/user/domain/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm/index';

@Entity("tbl_board")
export class Board {

    @PrimaryGeneratedColumn()
    bno?: number

    @Column({ default: '' })
    content: string;

    @Column({ default: false })
    isNotice?: boolean


    @ManyToOne((type) => User, (writer) => writer.userId)
    writer: User

    @Column({ default: false })
    isRemoved?: boolean
}