import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./company";
import { User } from "./user";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  posterID: number;

  @Column()
  company: String;

  @Column()
  positionTitle: String;

  @Column()
  location: String;

  @Column()
  salaryCAD: number;

  @Column()
  salaryUSD: number;

  @Column()
  positionStartDate: Date;

  @Column()
  positionEndDate: Date;

  @Column()
  workType: String;

  @Column()
  benefits: String;

  @Column()
  interviewProcess: String;

  @Column()
  comments: String;

  @ManyToOne(() => Company, (c) => c.id)
  c: Company;

  @ManyToOne(() => User, (u) => u.id)
  u: User;
}
