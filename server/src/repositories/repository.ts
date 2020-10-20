import { Document, Model } from 'mongoose';

export class Repository<T extends Document> {
  constructor(private model: Model<T>) { }

  public create(item: T): Promise<T> {
    const document = new this.model(item);
    return document.save();
  }

  public get(): Promise<T[]> {
    return this.model.find({}).exec();
  }

  public getById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }
}
