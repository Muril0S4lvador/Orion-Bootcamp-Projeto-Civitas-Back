import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from 'typeorm';
  
  import { enumYears } from '../models/enums/EnumYears';
  import { enumShifts } from '../models/enums/EnumShifts';
  import { enumTeaching } from '../models/enums/EnumTeaching';
  import { Student } from './Student';

  @Entity('classes')
  export class Class {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      name: 'schoolYear',
      type: 'enum',
      enum: enumYears
    })
    public yearType: enumYears;
  
    @Column({
        name: 'shift',
        type: 'enum',
        enum: enumShifts
      })
      public shiftType: enumShifts;

    @Column({
        name: 'teaching',
        type: 'enum',
        enum: enumTeaching
    })
    public teachingType: enumTeaching;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    identifier: string;

    @OneToMany(() => Student, (student) => student.class)
    students: Student[];

}