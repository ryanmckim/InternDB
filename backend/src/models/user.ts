import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: String;

  @Column()
  password: String;

  @OneToMany(() => Review, (r) => r.userID)
  reviews: Array<Review>;
}
