import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

import { enumYears } from '../models/enums/EnumYears';

@Entity('grade')
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'schoolYear',
        type: 'enum',
        enum: enumYears
    })
    public yearType: string;

    @Column({ default: () => 'NOW()' })
    createdAt: Date;

    @Column({ default: () => 'NOW()' })
    updatedAt: Date;

    @BeforeInsert()
    public setCreatedAt(): void {
        this.createdAt = new Date();
    }

    @BeforeInsert()
    @BeforeUpdate()
    public setUpdateAt(): void {
        this.updatedAt = new Date();
    }

}
