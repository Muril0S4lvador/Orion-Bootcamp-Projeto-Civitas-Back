import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserClassesTable1731026893636 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_classes',
                columns: [
                    {
                        name: 'user_id',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'class_id',
                        type: 'int',
                        isPrimary: true
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            'user_classes',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE'
            })
        );

        await queryRunner.createForeignKey(
            'user_classes',
            new TableForeignKey({
                columnNames: ['class_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'classes',
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_classes');
    }
}
