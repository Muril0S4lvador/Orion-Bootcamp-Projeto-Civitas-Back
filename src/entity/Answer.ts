import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PDI } from './PDI';
import { enumQuestionType } from '../models/enums/EnumQuestionType';

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    points: number;

    @ManyToMany(() => PDI, pdi => pdi.answers)
    pdis: PDI;

    @Column({ type: 'varchar', length: '100', nullable: false })
    answer: string;

    @Column({ name: 'questionType', type: 'enum', enum: enumQuestionType })
    public questionType: enumQuestionType;

    @CreateDateColumn({ default: () => 'NOW()' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'NOW()' })
    updatedAt: Date;
}
