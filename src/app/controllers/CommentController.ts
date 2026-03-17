import { Request, Response } from "express";
import { CommentService } from "../../domain/services";
import { JwtPayload } from "../middlewares/auth";

const commentService = new CommentService();

export class CommentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as Request & { user?: JwtPayload }).user;
      const comment = await commentService.create({
        ...req.body,
        articleId: req.params.articleId as string,
        authorId: user?.userId,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar comentário", error });
    }
  }

  async findByArticle(req: Request, res: Response): Promise<void> {
    try {
      const comments = await commentService.findByArticleId(req.params.articleId as string);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar comentários", error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const comment = await commentService.findById(req.params.id as string);
      if (!comment) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar comentário", error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const comment = await commentService.update(req.params.id as string, req.body);
      if (!comment) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }
      res.json(comment);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar comentário", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const comment = await commentService.delete(req.params.id as string);
      if (!comment) {
        res.status(404).json({ message: "Comentário não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir comentário", error });
    }
  }
}
