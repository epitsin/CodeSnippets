import mongoose from 'mongoose';

import Locals from './locals';
import DataInitializer from '../utils/dataInitializer';

export class Database {
  // Initialize your database pool
  public static init(): any {
    const connectionString = Locals.config().mongooseUrl;
    const options = {
      useNewUrlParser: true,

      // Use createIndex instead of ensureIndex (deprecated)
      useCreateIndex: true,

      // Use MongoDb's finOneAndUpdate instead of findAndModify (deprecated)
      useFindAndModify: false,
    };

    mongoose.connect(connectionString, options, (error) => {
      if (error) {
        console.log(error);
        throw error;
      }

      DataInitializer.populateInitialData();
    });
  }
}

export default Database;
