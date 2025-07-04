import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

/** Autenticacion y registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El Password es muy corto, mínimo necesitas 8 caracteres'),
    handleInputErrors,
    createAccount)

router.post('/auth/login', 
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El password es obligatorio'),
    handleInputErrors,
    login)

export default router