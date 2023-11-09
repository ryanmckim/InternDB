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

  @Column({ type: "float" })
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
