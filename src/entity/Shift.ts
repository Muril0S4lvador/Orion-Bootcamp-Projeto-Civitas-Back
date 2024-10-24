import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

import { enumShifts } from '../models/enums/EnumShifts';

@Entity('shift')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'shift',
    type: 'enum',
    enum: enumShifts
  })
  public shiftType: string;

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
