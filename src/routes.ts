import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { TeacherController } from './controller/TeacherController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';
import { StudentController } from './controller/StudentController';
import { validateClassData } from './validators/ClassValidator';
import { validateTeacherData } from './validators/TeacherValidator';
import { validateStudentData } from './validators/StudentValidator';
import { validationResult } from 'express-validator';
import { authMiddleware } from './middlewares/AuthMiddleware';
import { enumRoles } from './models/enums/EnumRoles';
import { PDIController } from './controller/PDIController';
import { UserController } from './controller/UserController';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

// Class
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

router.get('/classes-options', authMiddleware([enumRoles.TEACHER, enumRoles.ADMIN]), new ClassController().getEnumsInfos);

router.get('/classes/:id/students', authMiddleware([enumRoles.TEACHER, enumRoles.ADMIN]), StudentController.getStudentsByClassId);

router.get('/classes/:id/teachers', TeacherController.getClassesByTeacherId);

// PDI
router.post('/pdi', authMiddleware([enumRoles.TEACHER, enumRoles.ADMIN]), new PDIController().createPDI);

router.get('/pdi/:id', authMiddleware([enumRoles.ADMIN, enumRoles.TUTOR]), new PDIController().getPDI);

// Students
router.post(
    '/students',
    authMiddleware([enumRoles.ADMIN]),
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

// Teacher
router.post(
    '/teachers',
    authMiddleware([enumRoles.ADMIN]),
    validateTeacherData(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    TeacherController.createTeacher
);

// User
router.post('/change-password', authMiddleware([enumRoles.ADMIN, enumRoles.TEACHER, enumRoles.TUTOR]), new UserController().changePassword);

export default router;
