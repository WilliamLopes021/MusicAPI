import { Request, Response, NextFunction } from "express";
import validator from "validator";

export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
  const email = req.body?.email;
  if (!email) {
    res.status(400).json({ message: "Email é obrigatório" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Email inválido" });
    return;
  }
  next();
};

export const validateObjectId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName] as string;
    if (!id || !validator.isMongoId(id)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }
    next();
  };
};
