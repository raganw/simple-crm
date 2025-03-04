import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserNote } from "./UserNote";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    firstName: string;

    @Column({ type: "varchar" })
    lastName: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "varchar" })
    phoneNumber: string;

    @OneToMany(() => UserNote, userNote => userNote.user)
    userNotes: UserNote[];
}
