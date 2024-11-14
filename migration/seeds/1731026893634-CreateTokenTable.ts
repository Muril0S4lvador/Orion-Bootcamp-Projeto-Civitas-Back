import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTokenTable1731026893634 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'token',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'expiresAt',
                        type: 'timestamp',
                        isNullable: false
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    }
                ]
            })
        );

        // Chave estrangeira para a relação `ManyToOne` entre `token` e `user`
        await queryRunner.createForeignKey(
            'token',
            new TableForeignKey({
                columnNames: ['user'],
                referencedColumnNames: ['tokens'],
                referencedTableName: 'user',
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave estrangeira e a tabela `token`
        await queryRunner.dropForeignKey('token', 'FK_token_user');
        await queryRunner.dropTable('token');
    }
}
