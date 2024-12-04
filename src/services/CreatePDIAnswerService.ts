import { PDIAnswerRepository } from '../repositories/PDIAnswerRepository';
import { PDI } from '../entity/PDI';
import { PDIAnswer } from '../entity/PDIAnswer';

/**
 * Cria um vetor de instâncias da entidade PDIAnswer
 * @param pdi PDI do banco de dados a ser relacionado as respostas
 * @param answers Respostas a seres relacionadas ao PDI (precisam ter índice e tipo de questão)
 */
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
