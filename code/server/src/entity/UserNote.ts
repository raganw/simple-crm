import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserNote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userNotes)
    user: User;

    @Column({ type: "varchar" })
    content: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
