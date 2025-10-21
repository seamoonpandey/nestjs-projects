import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleDocument.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const created = await this.articleModel.create(createArticleDto);
    const obj = created.toObject();
    // normalize mongoose _id to id for API consumers
    return { ...obj, id: obj._id?.toString() } as unknown as Article;
  }

  async findAll(): Promise<Article[]> {
    const res = await this.articleModel.find().lean().exec();
    return res.map(
      (r) => ({ ...r, id: (r as any)._id?.toString() }) as unknown as Article,
    );
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).lean().exec();
    if (!article) throw new NotFoundException('Article not found');
    return { ...article, id: (article as any)._id?.toString() } as unknown as Article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const updated = await this.articleModel
      .findByIdAndUpdate(id, updateArticleDto, { new: true })
      .lean()
      .exec();
    if (!updated) throw new NotFoundException('Article not found');
    return { ...updated, id: (updated as any)._id?.toString() } as unknown as Article;
  }

  async remove(id: string): Promise<void> {
    const res = await this.articleModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Article not found');
  }
}
