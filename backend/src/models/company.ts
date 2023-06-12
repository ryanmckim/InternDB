import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
  reviews: Array<String>;
}
