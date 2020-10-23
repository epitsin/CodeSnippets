/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'http';

import Express from './express';
import { Database } from './database';

class App {
  public loadConfiguration(): void {
    dotenv.config({ path: path.join(__dirname, '../../.env') });
  }

  public async loadDatabase(): Promise<void> {
    return Database.init();
  }

  public async loadServer(): Promise<Server> {
    this.loadConfiguration();

    await this.loadDatabase();

    Express.init();
    return Express.start();
  }
}

export default new App();
