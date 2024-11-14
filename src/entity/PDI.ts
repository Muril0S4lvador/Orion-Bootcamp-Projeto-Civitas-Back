import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Student } from './Student';
import { User } from './User';
import { enumAnswers } from '../models/enums/EnumAnswers';

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

    @Column({ type: 'enum', enum: enumAnswers })
    answersEmotionalInteligence: enumAnswers[];

    @Column({ type: 'enum', enum: enumAnswers })
    answersAcademicDevelopment: enumAnswers[];

    @Column({ type: 'enum', enum: enumAnswers })
    answersResponsability: enumAnswers[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
