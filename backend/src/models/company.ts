import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./review";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: String;

  @Column()
  avgSalary: number;

  @Column()
  numReviews: number;

  @Column("text", { array: true })
  reviews: Array<Review>;

  @OneToMany(() => Review, (r) => r.id)
  r: Review;
}
