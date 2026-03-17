import { Request, Response } from "express";
import { AdministratorService } from "../../domain/services";

const adminService = new AdministratorService();

export class AdministratorController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const admin = await adminService.create(userId, role);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar administrador", error });
    }
  }

  async findByUserId(req: Request, res: Response): Promise<void> {
    try {
      const admin = await adminService.findByUserId(req.params.userId as string);
      if (!admin) {
        res.status(404).json({ message: "Administrador não encontrado" });
        return;
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar administrador", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const admin = await adminService.delete(req.params.id as string);
      if (!admin) {
        res.status(404).json({ message: "Administrador não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir administrador", error });
    }
  }
}
