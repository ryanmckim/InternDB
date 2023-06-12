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

  @OneToMany(() => Review, (r) => r.company)
  reviews: Array<Review>;
}
