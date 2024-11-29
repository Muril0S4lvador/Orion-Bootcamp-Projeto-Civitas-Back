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

    @ManyToMany(() => Answer)
    @JoinTable({ name: 'pdi_answer_emotional_inteligence' })
    answersEmotionalInteligence: Answer[];

    @ManyToMany(() => Answer)
    @JoinTable({ name: 'pdi_answer_academic_development' })
    answersAcademicDevelopment: Answer[];

    @ManyToMany(() => Answer)
    @JoinTable({ name: 'pdi_answer_responsability' })
    answersResponsability: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
