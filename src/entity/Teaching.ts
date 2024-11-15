import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('teaching')
export class Teaching {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({ default: () => 'NOW()' })
    createdAt: Date;

    @Column({ default: () => 'NOW()' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    public setUpdateAt(): void {
        this.updatedAt = new Date();
    }
}
