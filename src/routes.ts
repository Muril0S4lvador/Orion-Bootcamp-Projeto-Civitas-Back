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

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

router.post(
    '/classes',
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
router.get('/classes-options', new ClassController().getEnumsInfos);

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

router.post(
    '/teachers',
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

router.post('/students-classes', StudentController.getStudentsByClassId);

export default router;
