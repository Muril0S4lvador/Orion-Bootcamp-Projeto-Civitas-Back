import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Student } from './Student';
import { Shift } from './Shift';
import { SchoolYear } from './SchoolYear';
import { Teaching } from './Teaching';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  schoolYear: number;

  @ManyToOne(() => SchoolYear)
  @JoinColumn({ name: 'schoolYear' })
  schoolYearRelation: SchoolYear;

  @Column({ type: 'int', nullable: false })
  shift: number;

  @ManyToOne(() => Shift)
  @JoinColumn({ name: 'shift' })
  shiftRelation: Shift;

  @Column({ type: 'int', nullable: false })
  teaching: number;

  @ManyToOne(() => Teaching)
  @JoinColumn({ name: 'teaching' })
  teachingRelation: Teaching;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  identifier: string;

  @ManyToMany(() => Student, (student) => student.classes)
  students: Student[];
}
