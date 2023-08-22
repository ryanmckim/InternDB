import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.reviews)
  @Column()
  userID: number;

  // @ManyToOne(() => Company, (company) => company.reviews)
  @Column()
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
  workOption: String;

  @Column()
  comments: String;
}
