import { Router } from 'express'

const router = Router()

/** Autenticacion y registro */
router.get('/auth/register', (req, res) => {
    console.log(req.body)
})

export default router