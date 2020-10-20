/* eslint-disable no-underscore-dangle */
import { Document, Model } from 'mongoose';

class Repository<T extends Document> {
  private model: Model<T>;

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

  public async create(body: T) {
    // eslint-disable-next-line new-cap
    const document = new this.model(body);

    return document.save();
  }
}

export default Repository;
