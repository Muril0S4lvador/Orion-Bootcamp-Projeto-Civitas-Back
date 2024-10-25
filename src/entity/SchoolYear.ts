import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

@Entity('schoolYear')
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false
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
