import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

import { enumTeaching } from '../models/enums/EnumTeaching';

@Entity('teaching')
export class Teaching {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'teaching',
    type: 'enum',
    enum: enumTeaching
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
