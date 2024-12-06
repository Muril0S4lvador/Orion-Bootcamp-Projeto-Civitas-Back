import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Student } from '../entity/Student';

export class StudentRepository extends Repository<Student> {
    constructor() {
        super(Student, MysqlDataSource.manager);
    }
    /**
     * Busca um estudante no banco de dados utilizando o número de matrícula.
     *
     * @param registration - Número de matrícula do estudante.
     * @returns O estudante encontrado ou `undefined` caso nenhum seja encontrado.
     * @throws Lança um erro caso ocorra um problema na consulta ao banco de dados.
     */
    async findStudentByRegistration(registration: number): Promise<Student | undefined> {
        try {
            const student = await MysqlDataSource.getRepository(Student).findOne({
                where: { registration }
            });

            return student;
        } catch (error) {
            console.error('Error finding student by registration:', error);
            throw new Error('Failed to find student by registration');
        }
    }
    /**
     * Busca um estudante no banco de dados utilizando o endereço de e-mail.
     *
     * @param email - Endereço de e-mail do responsável do estudante.
     * @returns O estudante encontrado ou `undefined` caso nenhum seja encontrado.
     * @throws Lança um erro caso ocorra um problema na consulta ao banco de dados.
     */
    async findStudentByEmail(email: string): Promise<Student | undefined> {
        try {
            const student = await MysqlDataSource.getRepository(Student).findOne({
                where: { email }
            });
            return student;
        } catch (error) {
            console.error('Error finding student by email:', error);
            throw new Error('Failed to find student by email');
        }
    }
    /**
     * Busca estudantes associados ao id de uma turma
     *
     * @param classId - Id da turma
     * @returns O(s) estudante(s) encontrado(s) ou `undefined` caso nenhum seja encontrado.
     * @throws Lança um erro caso ocorra um problema na consulta ao banco de dados.
     */
    async findStudentsByClassId(classId: number): Promise<Student[] | undefined> {
        const students = await MysqlDataSource.getRepository(Student)
            .createQueryBuilder('student')
            .innerJoin('student.classes', 'class')
            .where('class.id = :classId', { classId })
            .getMany();

        return students;
    }
    /**
     * Busca um aluno com base no id
     * @param id Id do aluno
     * @returns O aluno encontrado ou undefined
     */
    async findStudentById(id: number): Promise<Student | undefined> {
        const student = await this.findOne({
            where: { id },
            relations: ['pdis']
        });

        return student;
    }
}
