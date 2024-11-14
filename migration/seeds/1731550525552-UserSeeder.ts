import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeder1731550525552 implements MigrationInterface {
    private table = 'user';
    private readonly users = [
        {
            name: 'professor',
            email: 'professor@email.com',
            password: '$2b$12$OoNb4ONmNct9ExjiZu8EbORGq/Kgbk8xgs0QicSvPUGmx4xpHmuVu',
            roles: '[TEACHER]'
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
