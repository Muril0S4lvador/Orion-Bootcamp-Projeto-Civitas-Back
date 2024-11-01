import { MigrationInterface, QueryRunner } from "typeorm"

export class SchoolYearSeeder1730347891363 implements MigrationInterface {

    private table = 'schoolYear';
    private readonly schoolYears = [
        {name: "1º ano"},
        {name: "2º ano"},
        {name: "3º ano"},
        {name: "4º ano"},
        {name: "5º ano"},
        {name: "6º ano"},
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.schoolYears);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.schoolYears.map((schoolYear) => schoolYear.name);
        await queryRunner.manager.createQueryBuilder()
            .delete()
            .from(this.table)
            .where('name IN (:...names)', { names })
            .execute();
    }

}
