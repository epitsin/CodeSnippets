import mongoose from 'mongoose';

import Locals from './locals';
import DataInitializer from '../utils/dataInitializer';

export class Database {
  // Initialize your database pool
  public static init(): any {
    const connectionString = Locals.config().mongooseUrl;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
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
