import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnswerSeeder1731873454489 implements MigrationInterface {
    private table = 'answer';
    private readonly answers = [
        { answerType: 'Excepcional', questionType: 'Inteligencia emocional' },
        { answerType: 'Acima das expectativas', questionType: 'Inteligencia emocional' },
        { answerType: 'Adequado', questionType: 'Inteligencia emocional' },
        { answerType: 'Abaixo das expectativas', questionType: 'Inteligencia emocional' },
        { answerType: 'Precisa de melhorias', questionType: 'Inteligencia emocional' },

        { answerType: 'Excepcional', questionType: 'Desenvolvimento academico' },
        { answerType: 'Acima das expectativas', questionType: 'Desenvolvimento academico' },
        { answerType: 'Adequado', questionType: 'Desenvolvimento academico' },
        { answerType: 'Abaixo das expectativas', questionType: 'Desenvolvimento academico' },
        { answerType: 'Precisa de melhorias', questionType: 'Desenvolvimento academico' },

        { answerType: 'Excepcional', questionType: 'Responsabilidade' },
        { answerType: 'Acima das expectativas', questionType: 'Responsabilidade' },
        { answerType: 'Adequado', questionType: 'Responsabilidade' },
        { answerType: 'Abaixo das expectativas', questionType: 'Responsabilidade' },
        { answerType: 'Precisa de melhorias', questionType: 'Responsabilidade' }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.answers);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.answers.map(answer => answer.answerType);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('name IN (:...names)', { names }).execute();
    }
}
