import { PDI } from '../../entity/PDI';
import { PDIAnswer } from '../../entity/PDIAnswer';

export interface PDITransactionResult {
    pdi: PDI;
    answers: PDIAnswer[];
}
