import { enumAnswers } from '../../src/models/enums/EnumAnswers';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePDITable1731560096206 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pdi',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'considerations',
                        type: 'varchar',
                        length: '600',
                        isNullable: true
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
                        name: 'answersEmotionalInteligence',
                        type: 'enum',
                        isNullable: false,
                        enum: Object.values(enumAnswers) as string[]
                    },
                    {
                        name: 'answersAcademicDevelopment',
                        type: 'enum',
                        isNullable: false,
                        enum: Object.values(enumAnswers) as string[]
                    },
                    {
                        name: 'answersResponsability',
                        type: 'enum',
                        isNullable: false,
                        enum: Object.values(enumAnswers) as string[]
                    },
                    {
                        name: 'student',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'teacher',
                        type: 'int',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['student'],
                        referencedTableName: 'student',
                        referencedColumnNames: ['id'], // Referencia o campo 'id' da tabela 'student'
                        onDelete: 'CASCADE'
                    }),
                    new TableForeignKey({
                        columnNames: ['teacher'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'], // Referencia o campo 'id' da tabela 'teacher'
                        onDelete: 'CASCADE'
                    })
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pdi', 'FK_893f5229110622ed384fa951f17 ');
        await queryRunner.dropForeignKey('pdi', 'FK_6e373dff2510d0ac5b1eb00b64f');
        await queryRunner.dropTable('pdi');
    }
}
