import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';
import { validateClassData } from './validators/ClassValidator';
import { validationResult } from 'express-validator';
import { authMiddleware } from './middlewares/AuthMiddleware';
import { enumRoles } from './models/enums/EnumRoles';
import { PDIController } from './controller/PDIController';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

router.post(
    '/classes',
    authMiddleware([enumRoles.TEACHER]),
    validateClassData(), // Note os parênteses aqui - a função retorna um array de validadores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    ClassController.createClass // Note que mudamos para createClass, não create
);

// Class
router.get('/classes-options', authMiddleware([enumRoles.TEACHER]), new ClassController().getEnumsInfos);

// PDI
router.post('/pdi', authMiddleware([enumRoles.TEACHER]), new PDIController().createPDI);

router.get('/pdi/:id', authMiddleware([enumRoles.ADMIN, enumRoles.TUTOR]), new PDIController().getPDI);

export default router;
