import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Student } from '../entity/Student';

export class StudentRepository extends Repository<Student> {
    constructor() {
        super(Student, MysqlDataSource.manager);
    }

    /**
     * Busca um aluno com base no id
     * @param id Id do aluno
     * @returns O aluno encontrado ou undefined
     */
    async findStudentById(id: number): Promise<Student | undefined> {
        const student = await this.findOne({
            where: { id }
        });

        return student;
    }
}
