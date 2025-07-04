import type { Request, Response } from "express"
import slug from 'slug'
import User from "../models/User"
import { hashPassword } from "../util/auth"

export const createAccount = async (req: Request, res: Response) => {
    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    if(handleExists){
        const error = new Error('Nombre de Usuario no disponible')
        res.status(409).json({error : error.message})
        return
    }

    const { email, password } = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        const error = new Error('El Usuario con ese email ya está registrado')
        res.status(409).json({error : error.message})
        return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send('Registro creado correctamente')
}

