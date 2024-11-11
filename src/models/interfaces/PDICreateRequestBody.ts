import { enumAnswers } from 'models/enums/EnumAnswers';

export interface PDICreateRequestBody {
    studentId: number;
    teacherId: number;
    answersEmotionalInteligence: enumAnswers[];
    answersAcademicDevelopment: enumAnswers[];
    answersResponsability: enumAnswers[];
    considerations: string;
}
