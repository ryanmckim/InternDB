import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
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
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  @Matches(emailRe)
  email: String;

  @Column()
  @Matches(pwdRe)
  password: string;

  @OneToMany((_type) => Review, (review) => review.user, {
    cascade: ["insert", "update", "remove"],
  })
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
