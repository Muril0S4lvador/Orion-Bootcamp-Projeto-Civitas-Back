import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";
import { enumYears } from "../src/models/enums/EnumYears";
import { enumShifts } from "../src/models/enums/EnumShifts";
import { enumTeaching } from "../src/models/enums/EnumTeaching";

export class CreateClassTable1730309097787 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "classes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "schoolYear",
                        type: "enum",
                        enum: enumYears,
                        isNullable: false,
                    },
                    {
                        name: "shift",
                        type: "enum",
                        enum: enumShifts,
                        isNullable: false,
                    },
                    {
                        name: "teaching",
                        type: "enum",
                        enum: enumTeaching,
                        isNullable: false,
                    },
                    {
                        name: "identifier",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                        isUnique: true,
                    },
                ],
            })
        );

        // Definindo a chave estrangeira para associar 'students' com 'classes'
        await queryRunner.createForeignKey(
            "classes",
            new TableForeignKey({
                columnNames: ["id"],
                referencedColumnNames: ["classId"],
                referencedTableName: "students",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Removendo a chave estrangeira e a tabela 'classes'
        await queryRunner.dropForeignKey("classes", "FK_class_students");
        await queryRunner.dropTable("classes");
    }
}
