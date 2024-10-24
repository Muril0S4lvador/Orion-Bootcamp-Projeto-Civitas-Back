import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne
} from 'typeorm';

import { Class } from './Class';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false, unique: true })
  registration: number;

  @Column({
    type: 'varchar',
    length: 11,
    unique: true,
    nullable: false
  })
  cpf: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.students)
  class: Class;

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
