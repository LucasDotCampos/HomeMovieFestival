import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Users from "./Users";

@Entity("movies")
export default class Movies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: string;

  @ManyToOne((type) => Users, (movies) => Movies)
  users: Users;

  @Column()
  pirate: string;

  @Column()
  magnet: string;

  @Column()
  image: string;
}
