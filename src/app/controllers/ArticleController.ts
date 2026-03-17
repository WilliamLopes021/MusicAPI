import { Request, Response } from "express";
import { ArticleService } from "../../domain/services";
import { JwtPayload } from "../middlewares/auth";

const articleService = new ArticleService();

export class ArticleController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as Request & { user?: JwtPayload }).user;
      const article = await articleService.create({
        ...req.body,
        authorId: user?.userId,
      });
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ message: "Erro ao criar artigo", error });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const published = req.query.published as string | undefined;
      const filters = published !== undefined ? { published: published === "true" } : undefined;
      const articles = await articleService.findAll(filters);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar artigos", error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const article = await articleService.findById(req.params.id as string);
      if (!article) {
        res.status(404).json({ message: "Artigo não encontrado" });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar artigo", error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const article = await articleService.update(req.params.id as string, req.body);
      if (!article) {
        res.status(404).json({ message: "Artigo não encontrado" });
        return;
      }
      res.json(article);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar artigo", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const article = await articleService.delete(req.params.id as string);
      if (!article) {
        res.status(404).json({ message: "Artigo não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir artigo", error });
    }
  }
}
