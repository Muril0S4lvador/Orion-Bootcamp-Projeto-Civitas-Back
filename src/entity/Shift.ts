import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

@Entity('shift')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
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
