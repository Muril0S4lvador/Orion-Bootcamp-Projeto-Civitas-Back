import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';

import { Student } from './Student';
import { User } from './User';
import { PDIAnswer } from './PDIAnswer';

@Entity('pdi')
export class PDI {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Student, student => student.pdi)
    @JoinColumn({ name: 'studentId' })
    student: Student;

    @ManyToOne(() => User, user => user.pdis)
    teacher: User;

    @Column({ type: 'varchar', length: 600, nullable: true })
    considerations: string;

    @OneToMany(() => PDIAnswer, pdi_answer => pdi_answer.pdi)
    public answers: PDIAnswer[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
