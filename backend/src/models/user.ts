import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Matches } from "class-validator";
import { Review } from "./Review";
import { emailRe, pwdRe } from "../constants/regex";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Matches(emailRe)
  email: String;

  @Column()
  @Matches(pwdRe)
  password: String;

  @OneToMany(() => Review, (r) => r.userID)
  reviews: Array<Review>;
}
