import { MigrationInterface, QueryRunner } from "typeorm"

export class UserSeeder1733160713109 implements MigrationInterface {
    private table = 'user';
    private readonly users = [
        {
            name: 'admin',
            email: 'admin@email.com',
            password: '$2b$12$OoNb4ONmNct9ExjiZu8EbORGq/Kgbk8xgs0QicSvPUGmx4xpHmuVu',
            roles: '[ADMIN]'
        },
        {
            name: 'professor',
            email: 'professor@email.com',
            password: '$2b$12$OoNb4ONmNct9ExjiZu8EbORGq/Kgbk8xgs0QicSvPUGmx4xpHmuVu',
            roles: '[TEACHER]'
        },
        {
            name: 'responsavel',
            email: 'responsavel@email.com',
            password: '$2b$12$OoNb4ONmNct9ExjiZu8EbORGq/Kgbk8xgs0QicSvPUGmx4xpHmuVu',
            roles: '[GUARDIAN]'
        }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const emails = this.users.map(user => user.email);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('email IN (:...emails)', { emails }).execute();
    }

}
