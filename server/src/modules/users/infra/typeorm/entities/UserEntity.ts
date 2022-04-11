import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import MoviesEntity from "../../../../movies/infra/typeorm/entities/MoviesEntity";

@Entity("users")
class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @OneToMany(() => MoviesEntity, (user) => UserEntity)
    movies: MoviesEntity[];

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;
}

export default UserEntity;
