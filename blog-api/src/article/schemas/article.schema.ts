import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ArticleDocument extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content?: string;

  @Prop()
  author?: string;
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleDocument);
