import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import Profiles from '../models/profileModel';

const protect = async(req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }
  
  
  if (!token) {
    res.status(401).json({message: "Not authorized (no token)"});
    return;
  }

  try {
    let decoded: string | jwt.JwtPayload = jwt.verify(token as string, process.env.JWT_SECRET as Secret);
    
    if (typeof decoded === 'string') {
      res.status(401).json({message: "Not authorized"});
      return;
    }
    
    res.locals.profile = await Profiles.findByPk(decoded.id);
  
    next();
  } catch (error) {
    res.status(401).json({message: "Not authorized (Token not match)"});
    return;
  }

}

const authorize = (...roles: Array<string>) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.profile.role)) {
      res.status(403).json({message: "Role forbidden"});
      return;
    }
    next();
  }
}

export { protect, authorize }