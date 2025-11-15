import {body, validationResult } from 'express-validator';
import {NextFunction, Request, Response} from 'express';


export const validate = (req: Request, res: Response, next: NextFunction): void => {
   const errors = validationResult(req);
   
   if (!errors.isEmpty()) {
      res.status(400).json({ message: "Error de validacion en los campos",
         details: errors.array({onlyFirstError: true})
      });
   }
   return next();

}

export const loginValidationRules = [ 
   body( 'email')
   .notEmpty().withMessage('El email es obligatorio')
   .isEmail().withMessage('El formato del email es invalido'),

   body('password')
   .notEmpty().withMessage('La contraseña es obligatoria')
];

export const registerValidationRules = [
   body('email')
   .notEmpty().withMessage("El email es obligatorio")
   .isEmail().withMessage("El formato del email es invalido"),

    body('password')
   .notEmpty().withMessage('La contraseña es obligatoria')
   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
   .withMessage("La contraseña debe tener minimo 8 caracteres, mayúscula, minúscula, número"),

   body('firstName')
   .notEmpty().withMessage("El nombre el obligatorio")
   .isLength({min:3}).withMessage("El nombre debe tener al menos 3 caracteres")
   
]