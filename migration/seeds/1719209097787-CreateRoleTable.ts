import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { enumRoles } from "../models/enums/EnumRoles";

export class CreateRoleTable1730339097790 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criação da tabela `role`
        await queryRunner.createTable(
            new Table({
                name: "role",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "autenticacao",
                        type: "enum",
                        enum: enumRoles,
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "NOW()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "NOW()",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a tabela `role`
        await queryRunner.dropTable("role");
    }
}
