import { Request, Response } from "express";
import { UserService } from "../../domain/services";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar usuário", error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.findById(req.params.id as string);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.update(req.params.id as string, req.body);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar usuário", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.delete(req.params.id as string);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir usuário", error });
    }
  }
}
