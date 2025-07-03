import { Router } from 'express'
import { createAccount } from './handlers'

const router = Router()

/** Autenticacion y registro */
router.get('/auth/register', createAccount)

export default router