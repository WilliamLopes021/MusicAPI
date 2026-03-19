import { ArticleModel } from "../models";
import { Article } from "../../../domain/entities";
import { IArticleRepository } from "../../../domain/repositories";
import { ArticleMapper } from "../mappers";


export class ArticleRepository implements IArticleRepository {
  async delete(id: string): Promise<void> {
    await ArticleModel.findByIdAndDelete(id);
  }

  async find(): Promise<Array<Article>> {
    const docs = await ArticleModel.find().populate('User');
    return docs.map((document) => ArticleMapper.toEntity(document))
  }

  async findById(id: string): Promise<Article | null> {
    const doc = await ArticleModel.findById(id.toString());
    if(!doc) return null

    return ArticleMapper.toEntity(doc);
  }

  async save(article: Article): Promise<Article> {
    const data = ArticleMapper.toDocument(article);

    const doc = await ArticleModel.findByIdAndUpdate(
      article._id,
      data,
      { new: true, upsert: true }
    )

    return ArticleMapper.toEntity(doc);
  }
}
