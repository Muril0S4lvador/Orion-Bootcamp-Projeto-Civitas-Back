import { PDIAnswerRepository } from '../repositories/PDIAnswerRepository';
import { PDI } from '../entity/PDI';
import { PDIAnswer } from '../entity/PDIAnswer';

export function createPDIAnswerService(pdi: PDI, answers: Partial<PDIAnswer>[]): PDIAnswer[] {
    const pdiAnswerRepository: PDIAnswerRepository = new PDIAnswerRepository();
    return answers.map(answer => {
        return pdiAnswerRepository.create({
            pdi: pdi,
            answerRelation: answer.answerRelation,
            index: answer.index,
            questionType: answer.questionType
        });
    });
}
