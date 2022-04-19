import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import UserEntity from "../../../../users/infra/typeorm/entities/UserEntity";
import { IMovie } from "../../../domain/models";

@Entity("movies")
class MoviesEntity implements IMovie {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    releaseDate: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    userId: UserEntity;

    @Column()
    magnet: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default MoviesEntity;
