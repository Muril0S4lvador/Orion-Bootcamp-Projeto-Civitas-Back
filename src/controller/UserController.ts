import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entity/User';
import { RouteResponse } from '../helpers/RouteResponse';
import { changePasswordRequestBody } from '../models/interfaces/ChangePasswordRequestBody';

export class UserController {
    /**
     * @swagger
     * /change-password:
     *   post:
     *     summary: Mudança de senha
     *     tags: [User]
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - newPassword
     *             properties:
     *               newPassword:
     *                 type: string
     *                 example: "NovaSenha"
     *     responses:
     *       '400':
     *         description: Token inválido ou ausente, usuário não encontrado ou erro ao salvar senha nova
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 'Token inválido ou ausente'
     *       '401':
     *         description: Usuário não possui role permitida para trocar senha
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 'Unauthorized Access'
     *       '200':
     *          description: Requisição executada com sucesso
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  success:
     *                    type: boolean
     *                    example: 'true'
     *                  data:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: number
     *                        example: 1
     *                      name:
     *                        type: string
     *                        example: 'usuario'
     *                      email:
     *                        type: string
     *                        example: 'usuario@email.com'
     *                      createdAt:
     *                        type: string
     *                        example: '2024-10-21T11:04:32.000Z'
     *                      updatedAt:
     *                        type: string
     *                        example: '2024-10-21T11:04:32.000Z'
     *                      roles:
     *                        type: array
     *                        items:
     *                          type: string
     *                          example: ['ADMIN', 'TEACHER']
     */
    async changePassword(req: Request, res: Response) {
        const { newPassword }: changePasswordRequestBody = req.body;
        const email: string = req.headers.email.toString() || '';
        const userRepository: UserRepository = new UserRepository();

        const existingUser: User = await userRepository.findUserByEmail(email);

        if (!existingUser) {
            return RouteResponse.error(res, 'Usuário selecionado não existente');
        }

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            existingUser.password = hashedPassword;
            const updatedUser = await userRepository.update(
                { id: existingUser.id },
                { password: hashedPassword, isFirstPassword: false, updatedAt: new Date() }
            );

            return RouteResponse.sucess(res, updatedUser);
        } catch (error) {
            return RouteResponse.error(res, error);
        }
    }
}
