import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./Review";

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

  @Column({ type: "jsonb" })
  @OneToMany(() => Review, (r) => r.companyID)
  reviews: Review[];
}
