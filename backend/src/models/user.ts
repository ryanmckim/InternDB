import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Matches } from "class-validator";
import { Review } from "./Review";
import { emailRe, pwdRe } from "../constants/regex";
import { Role } from "../types/roles";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  @Matches(emailRe)
  email: String;

  @Column()
  @Matches(pwdRe)
  password: String;

  // @OneToMany(() => Review, (review) => review.userID)
  @Column({ type: "jsonb", default: [] })
  reviews: Review[];

  @Column()
  role: Role;
}
