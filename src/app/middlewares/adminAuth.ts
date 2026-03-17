import { Request, Response, NextFunction } from "express";
import { AdministratorService } from "../../domain/services";

const adminService = new AdministratorService();

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = (req as Request & { user?: { userId: string } }).user;

  if (!user?.userId) {
    res.status(401).json({ message: "Não autenticado" });
    return;
  }

  const isAdmin = await adminService.isAdmin(user.userId);
  if (!isAdmin) {
    res.status(403).json({ message: "Acesso negado. Apenas administradores." });
    return;
  }

  next();
};
