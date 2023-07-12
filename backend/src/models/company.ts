import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: String;

  @Column()
  avgSalary: number;

  @Column()
  numReviews: number;

  // @OneToMany(() => Review, (review) => review.companyID)
  @Column({ type: "jsonb", default: [] })
  reviews: Review[];
}
