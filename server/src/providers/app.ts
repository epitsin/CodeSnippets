import dotenv from 'dotenv';
import path from 'path';

import Express from './express';
import { Database } from './database';

class App {
  // Loads your dotenv file
  public static loadConfiguration(): void {
    dotenv.config({ path: path.join(__dirname, '../../.env') });
  }

  // Loads your Server
  public static loadServer(): void {
    Express.init();
  }

  // Loads the Database Pool
  public static loadDatabase(): void {
    Database.init();
  }
}

export default App;
