import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./company";
import { User } from "./user";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.id)
  userID: number;

  @ManyToOne(() => Company, (c) => c.name)
  company: String;

  @Column()
  positionTitle: String;

  @Column()
  location: String;

  @Column()
  salary: number;

  @Column()
  currency: String;

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
}
