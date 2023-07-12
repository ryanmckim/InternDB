import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: String;

  @Column()
  password: String;

  @OneToMany(() => Review, (review) => review.userID)
  reviews: Review[];
}
