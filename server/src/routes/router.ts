import express from 'express';
import { SnippetsRouter } from './snippetsRouter';

export class Router {
  get routes() {
    var app = express();
    app.use("/", new SnippetsRouter().routes);
    return app;
  }
}