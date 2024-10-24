import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RouteResponse } from '../helpers/RouteResponse';
import { TokenRepository } from '../repositories/TokenRepository';
import { UserRepository } from '../repositories/UserRepository';

export class AuthController {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Autenticação do Usuário
   *     tags: [Login]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - email
   *              - password
   *            properties:
   *              email:
   *                type: string
   *                example: "usuario@email.com"
   *              password:
   *                type: string
   *                example: "senha"
   *     responses:
   *       '200':
   *         description: Requisição executada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Status da requisição
   *                   example: "true"
   *                 data:
   *                   type: string
   *                   description: Token JWT de autenticação
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       '500':
   *         description: Dados incorretos ou ausentes
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Nome de usuário ou senha incorretos"
   *       '404':
   *         description: Dados do usuário incorretos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Nome de usuário ou senha incorretos"
   */
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const tokenRepository = new TokenRepository();
    const userRepository = new UserRepository();

    if (!email || !password) {
      return RouteResponse.error(
        response,
        'email ou senha do usuário ausentes'
      );
    }

    const existingUser = await userRepository.findUserByEmail(email);

    if (!existingUser) {
      return RouteResponse.notFound(
        response,
        'Nome de usuário ou senha incorretos'
      );
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return RouteResponse.error(
        response,
        'Nome de usuário ou senha incorretos'
      );
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
    const expiresAt = new Date(decoded.exp * 1000);

    tokenRepository.save({ token, expiresAt, userId: existingUser.id });

    return RouteResponse.sucess(response, token);
  }

  /**
   * @swagger
   * /me:
   *   get:
   *     summary: Retorna as informações de um usuário de acordo com o token
   *     tags: [auth]
   *     produces:
   *       - application/json
   *     security:
   *       - BearerAuth: []
   *     responses:
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
   *                      roles:
   *                        type: array
   *                        items:
   *                          type: string
   *                          example: ['ADMIN', 'TEACHER']
   *       '404':
   *         description: Token válido, mas usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Usuário não encontrado"
   *       '400':
   *         description: Token ausente ou inválido
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Token inválido ou ausente"
   */
  async returnUserInfo(req: Request, res: Response) {
    const userRepository = new UserRepository();
    if (
      !req.headers.authorization ||
      !req.headers.authorization.includes('Bearer')
    ) {
      return RouteResponse.error(res, 'Token inválido ou ausente');
    }

    const token = req.headers.authorization.replace('Bearer ', '');
    let decoded = null;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.email) {
        throw new Error();
      }
    } catch (error) {
      return RouteResponse.error(res, 'Token inválido ou ausente');
    }

    const existingUser = await userRepository.findUserByEmail(undefined);

    if (!existingUser) {
      return RouteResponse.notFound(res, 'Usuário não encontrado');
    }

    delete existingUser.password;
    delete existingUser.createdAt;
    delete existingUser.updateAt;

    return RouteResponse.sucess(res, existingUser);
  }
}
