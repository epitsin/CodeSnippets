import { Document, Model } from 'mongoose';

class Repository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async get(query = {}, multiple = true) {
    const results = multiple ? this.model.find(query).exec() : this.model.findOne(query).exec();

    return results;
  }

  public getById(id: string) {
    return this.model.findById(id).exec();
  }
}

export default Repository;
