import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  // @ManyToOne(() => User, (user) => user.reviews)
  userID: number;

  @Column({ unique: true })
  // @ManyToOne(() => Company, (company) => company.reviews)
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
