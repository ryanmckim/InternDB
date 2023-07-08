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

  @Column({ type: "jsonb" })
  @OneToMany(() => Review, (r) => r.userID, {
    cascade: true,
    onDelete: "CASCADE",
  })
  reviews: Review[];
}
