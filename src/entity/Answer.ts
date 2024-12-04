import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('answer')
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    points: number;

    @Column({ type: 'varchar', length: '100', nullable: false })
    answer: string;

    @CreateDateColumn({ default: () => 'NOW()' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'NOW()' })
    updatedAt: Date;
}
