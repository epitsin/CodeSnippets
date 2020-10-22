import mongoose from 'mongoose';

import Locals from './locals';
import DataInitializer from '../utils/dataInitializer';

export class Database {
  // Initialize your database pool
  public static init(): any {
    const connectionString = Locals.config().mongooseUrl;

    // https://mongoosejs.com/docs/deprecations.html
    const options = {
      useNewUrlParser: true,

      // Use createIndex instead of ensureIndex (deprecated)
      useCreateIndex: true,

      // Use MongoDb's finOneAndUpdate instead of findAndModify (deprecated)
      useFindAndModify: false,

      // Use the new topology engine for monitoring servers
      useUnifiedTopology: true,
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
