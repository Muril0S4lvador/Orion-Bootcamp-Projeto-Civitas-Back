import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmotionalInteligenceAnswerTable1732912819722 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pdi_answer_emotional_inteligence',
                columns: [
                    { name: 'answerId', type: 'int', isPrimary: true },
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pdi_answer_emotional_inteligence');
    }
}
