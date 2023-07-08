import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./Company";
import { User } from "./User";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.id, { onDelete: "CASCADE" })
  userID: number;

  @ManyToOne(() => Company, (c) => c.id, { onDelete: "CASCADE" })
  companyID: number;

  @Column()
  positionTitle: String;

  @Column()
  location: String;

  @Column()
  salary: number;

  @Column()
  currency: String;

  @Column({ type: "date" })
  positionStartDate: string;

  @Column({ type: "date" })
  positionEndDate: string;

  @Column()
  workType: String;

  @Column()
  workOption: String;

  @Column()
  benefits: String;

  @Column()
  interviewProcess: String;

  @Column()
  comments: String;
}
