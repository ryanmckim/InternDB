import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.reviews)
  userID: number;

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
