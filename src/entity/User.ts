import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, OneToMany, JoinTable } from 'typeorm';

import { Role } from './Role';
import { Token } from './Token';
import { PDI } from './PDI';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ default: () => 'NOW()' })
    createdAt: Date;

    @Column({ default: () => 'NOW()' })
    updatedAt: Date;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({ name: 'role_user' })
    roles: Role[];

    @OneToMany(() => Token, token => token.userId)
    tokens: Token[];

    @OneToMany(() => PDI, pdi => pdi.teacher)
    pdis: PDI[];

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
