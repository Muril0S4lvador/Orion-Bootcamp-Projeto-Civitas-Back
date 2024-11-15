import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShiftSeeder1730339097787 implements MigrationInterface {
    private table = 'shift';
    private readonly shifts = [{ name: 'Manhã' }, { name: 'Tarde' }, { name: 'Noite' }];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.shifts);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.shifts.map(shift => shift.name);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('name IN (:...names)', { names }).execute();
    }
}
