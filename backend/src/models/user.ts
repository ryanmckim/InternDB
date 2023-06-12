import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./review";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column("text", { array: true })
  reviews: Array<Review>;

  @OneToMany(() => Review, (r) => r.userID)
  r: Review;
}
