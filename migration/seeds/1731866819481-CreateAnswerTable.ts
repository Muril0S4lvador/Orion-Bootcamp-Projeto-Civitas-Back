import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnswerTable1731866819481 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'answer',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'points',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    },
                    {
                        name: 'answer',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('answer');
    }
}
