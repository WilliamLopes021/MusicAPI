import { Article } from "../entities";

export interface IArticleRepository {
  find(): Promise<Array<Article>>;
  save(data: Article): Promise<Article>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Article | null>;
}






