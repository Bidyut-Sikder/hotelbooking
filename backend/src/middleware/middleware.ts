


import { check } from "express-validator";




export const userRegisterCheckMiddleware=[
    check('firstName','First Name is required.').isLength({min:3,max:20}).withMessage('Name mustbe between 3 and 20 characters'),
    check('lastName','Last Name is required.').isLength({min:3,max:20}).withMessage('Name mustbe between 3 and 20 characters'),
    check('email','email is required.').isEmail().withMessage('Please enter a valid email'),
    check('password','Password is required.').isLength({min:6,max:20}).withMessage('Password mustbe between 6 and 20 characters'),

]

export const userLoginCheckMiddleware=[

    check('email','email is required.').isEmail().withMessage('Please enter a valid email'),
    check('password','Password is required.')
 
]



