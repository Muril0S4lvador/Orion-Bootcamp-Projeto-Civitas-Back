import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePDIAnswerTable1731866827065 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pdi_answer',
                columns: [
                    {
                        name: 'answerId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'pdiId',
                        type: 'int',
                        isPrimary: true
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['answerId'],
                        referencedTableName: 'answer',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: ['pdiId'],
                        referencedTableName: 'pdi',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pdi_answer');
    }
}
