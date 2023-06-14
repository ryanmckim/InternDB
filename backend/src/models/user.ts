import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Matches } from "class-validator";
import { Review } from "./Review";
import { emailRe, pwdRe } from "../constants/regex";
import { Role } from "../types/roles";
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

  @Column()
  role: Role;

  @OneToMany(() => Review, (r) => r.userID)
  reviews: Array<Review>;
}
