import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
    ManyToMany,
    OneToMany
  } from 'typeorm';
  
  import { Role } from './Role';
  import { Token } from './Token';
  import { Class } from './Class';
  
  @Entity('student')
  export class Student {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    registration: number;
    
    @Column({
      type: 'varchar',
      length: 11, 
      unique: true, // CPF deve ser único
      nullable: false // CPF não pode ser nulo
    })
    cpf: string;
    
    @Column({ unique: true })
    email: string;
    
    @ManyToOne(() => Class, (classEntity) => classEntity.students)
    class: Class;
  
    @Column({ default: () => 'NOW()' })
    createdAt: Date;
  
    @Column({ default: () => 'NOW()' })
    updateAt: Date;
  
    @BeforeInsert()
    public setCreatedAt(): void {
      this.createdAt = new Date();
    }
    @BeforeInsert()
    @BeforeUpdate()
    public setUpdateAt(): void {
      this.updateAt = new Date();
    }

  }
  