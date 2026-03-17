import { Request, Response } from "express";
import { ValidationService } from "../../domain/services";

const validationService = new ValidationService();

export class ValidationController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as Request & { user?: { userId: string } }).user;
      const { type, expiresInHours } = req.body;
      const userId = req.body.userId || user?.userId;
      if (!userId) {
        res.status(400).json({ message: "userId é obrigatório" });
        return;
      }
      const validation = await validationService.create(userId, type, expiresInHours);
      res.status(201).json(validation);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar validação", error });
    }
  }

  async validate(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const validation = await validationService.findByToken(token as string);
      if (!validation) {
        res.status(400).json({ message: "Token inválido ou expirado" });
        return;
      }
      await validationService.markAsUsed(validation._id.toString());
      res.json({ message: "Validação concluída com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao validar", error });
    }
  }
}
