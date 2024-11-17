import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PDI } from './PDI';
import { enumAnswers } from '../models/enums/EnumAnswers';
import { enumQuestionType } from '../models/enums/EnumQuestionType';

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => PDI, pdi => pdi.answers)
    pdis: PDI;

    @Column({ name: 'answer', type: 'enum', enum: enumAnswers })
    public answerType: enumAnswers;

    @Column({ name: 'questionType', type: 'enum', enum: enumQuestionType })
    public questionType: enumQuestionType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
