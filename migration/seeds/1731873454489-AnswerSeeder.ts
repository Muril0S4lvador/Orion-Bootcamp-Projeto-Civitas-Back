import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnswerSeeder1731873454489 implements MigrationInterface {
    private table = 'answer';
    private readonly answers = [
        { answerType: 'Excepcional', questionType: 'Inteligencia emocional', points: 5 },
        { answerType: 'Acima das expectativas', questionType: 'Inteligencia emocional', points: 4 },
        { answerType: 'Adequado', questionType: 'Inteligencia emocional', points: 3 },
        { answerType: 'Abaixo das expectativas', questionType: 'Inteligencia emocional', points: 2 },
        { answerType: 'Precisa de melhorias', questionType: 'Inteligencia emocional', points: 1 },

        { answerType: 'Excepcional', questionType: 'Desenvolvimento academico', points: 5 },
        { answerType: 'Acima das expectativas', questionType: 'Desenvolvimento academico', points: 4 },
        { answerType: 'Adequado', questionType: 'Desenvolvimento academico', points: 3 },
        { answerType: 'Abaixo das expectativas', questionType: 'Desenvolvimento academico', points: 2 },
        { answerType: 'Precisa de melhorias', questionType: 'Desenvolvimento academico', points: 1 },

        { answerType: 'Excepcional', questionType: 'Responsabilidade', points: 5 },
        { answerType: 'Acima das expectativas', questionType: 'Responsabilidade', points: 4 },
        { answerType: 'Adequado', questionType: 'Responsabilidade', points: 3 },
        { answerType: 'Abaixo das expectativas', questionType: 'Responsabilidade', points: 2 },
        { answerType: 'Precisa de melhorias', questionType: 'Responsabilidade', points: 1 }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.answers);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.answers.map(answer => answer.answerType);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('name IN (:...names)', { names }).execute();
    }
}
