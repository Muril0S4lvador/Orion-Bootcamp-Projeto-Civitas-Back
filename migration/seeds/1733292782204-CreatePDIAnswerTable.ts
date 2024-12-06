import { enumQuestionType } from '../../src/models/enums/EnumQuestionType';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePDIAnswerTable1733292782204 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pdi_answer',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'questionType',
                        type: 'enum',
                        enum: Object.values(enumQuestionType) as string[],
                        isNullable: false
                    },
                    {
                        name: 'index',
                        type: 'int',
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
                    },
                    {
                        name: 'answer',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'pdiId',
                        type: 'int',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['answer'],
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
