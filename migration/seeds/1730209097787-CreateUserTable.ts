import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1730209097787 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'registration',
                        type: 'int',
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    }
                ]
            }),
            true
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover chave estrangeira `token.userId`
        await queryRunner.dropTable('user');
    }
}
