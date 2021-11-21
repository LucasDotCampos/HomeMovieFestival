import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import Movies from "./Movies";

@Entity("users")
export default class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany((type) => Movies, (users) => Users)
  movies: Movies[];

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
