import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: String;

  @OneToMany((_type) => Review, (review) => review.company, {
    cascade: ["insert", "update", "remove"],
  })
  reviews: Review[];
}
