import { Document, Model } from 'mongoose';

class Repository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async getOne(query = {}): Promise<T | null> {
    return this.model.findOne(query).exec();
  }

  public async getMany(query = {}): Promise<T[]> {
    return this.model.find(query).exec();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public async updateMany(findQuery: {}, updateQuery: {}): Promise<any> {
    return this.model.updateMany(findQuery, updateQuery).exec();
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndRemove(id).exec();
  }

  public async deleteMany(query: {}): Promise<any> {
    return this.model.deleteMany(query).exec();
  }
}

export default Repository;
