import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";
import { Matches } from "class-validator";
import { Review } from "./Review";
import { emailRe, pwdRe } from "../constants/regex";
import { Role } from "../types/roles";
import { ROLES } from "../constants/roles";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Matches(emailRe)
  email: String;

  @Column()
  @Matches(pwdRe)
  password: string;

  // @OneToMany(() => Review, (review) => review.userID)
  @Column({ type: "jsonb", default: [] })
  reviews: Review[];

  @Column({ type: "enum", enum: ROLES, default: ROLES.USER })
  role: Role;

  @Column("boolean", { default: false })
  verified: boolean = false;

  @CreateDateColumn()
  createdOn: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  matchPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  getSignedToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET!, {
      expiresIn: parseInt(process.env.JWT_EXPIRE!),
    });
  }

  getVerificationToken() {
    return jwt.sign(
      { id: this.id, email: this.email },
      process.env.JWT_SECRET!
    );
  }
}
