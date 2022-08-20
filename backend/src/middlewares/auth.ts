import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';

const jwt = require('jsonwebtoken');

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  let token;
  if (header) token = header.split(" ")[1];

  if (!token) return res.status(401).json({error: "Acceso denegado."});

  try {
    const tokenData = jwt.verify(token, process.env.TOKEN);

    req.user = tokenData;

    next();

  } catch (err: any) {
    res.status(400).json({error: "Acceso denegado, el token no es válido."});
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  let role = req.user?.role

  if (role != "admin") res.status(401).json({error: "Acceso denegado, no tienes las facultades necesarias."})

  next();
};
