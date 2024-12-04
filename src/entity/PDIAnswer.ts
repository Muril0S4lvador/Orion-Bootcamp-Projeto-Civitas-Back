import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

import { Answer } from './Answer';
import { PDI } from './PDI';
import { enumQuestionType } from '../models/enums/EnumQuestionType';

@Entity('pdi_answer')
export class PDIAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'questionType',
        type: 'enum',
        enum: enumQuestionType
    })
    public questionType: enumQuestionType;

    @Column({ type: 'int', nullable: false })
    index: number;

    @ManyToOne(() => PDI, pdi => pdi.answers)
    pdi: PDI;

    @ManyToOne(() => Answer)
    @JoinColumn({ name: 'answer' })
    answerRelation: Answer;

    @CreateDateColumn({ default: () => 'NOW()' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'NOW()' })
    updatedAt: Date;
}
