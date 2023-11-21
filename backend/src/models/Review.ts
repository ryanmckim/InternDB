import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Company } from "./Company";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => User, (user) => user.reviews, {
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne((_type) => Company, (company) => company.reviews, {
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "companyId" })
  company: Company;

  @Column()
  positionTitle: String;

  @Column()
  location: String;

  @Column({ type: "float", nullable: true })
  salary: number;

  @Column({ nullable: true })
  currency: String;

  @Column({ type: "date", nullable: true })
  positionStartDate: string;

  @Column({ type: "date", nullable: true })
  positionEndDate: string;

  @Column({ nullable: true })
  workOption: String;

  @Column({ nullable: true })
  comments: String;
}
