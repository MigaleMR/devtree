import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { createAccount } from "../handlers"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) =>{
    let errors = validationResult(req)
    console.log('Desde validation.ts')
    if (!errors.isEmpty()){
        res.status(400).json({errors : errors.array()})
        return
    }
    next()
}