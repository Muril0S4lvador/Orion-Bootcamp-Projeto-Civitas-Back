import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';
import { StudentController } from './controller/StudentController';
import { validateClassData } from './validators/ClassValidator';
import { validateStudentData } from './validators/StudentValidator';
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
    validateClassData(), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    ClassController.createClass
);

// Class
router.get('/classes-options', authMiddleware([enumRoles.TEACHER]), new ClassController().getEnumsInfos);

// PDI
router.post('/pdi', authMiddleware([enumRoles.TEACHER]), new PDIController().createPDI);

router.post(
    '/students',
    validateStudentData(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    StudentController.createStudent
);

export default router;
