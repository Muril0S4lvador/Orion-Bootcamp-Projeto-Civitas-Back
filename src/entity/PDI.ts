import { PrimaryGeneratedColumn, Entity, Column, ManyToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';

import { Student } from './Student';
import { User } from './User';
import { Answer } from './Answer';

@Entity('pdi')
export class PDI {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, student => student.pdis)
    student: Student;

    @ManyToOne(() => User, user => user.pdis)
    teacher: User;

    @Column({ type: 'varchar', length: 600, nullable: true })
    considerations: string;

    @ManyToMany(() => Answer, answer => answer.pdis)
    @JoinTable({ name: 'pdi_answer' })
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
