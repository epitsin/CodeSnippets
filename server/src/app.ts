import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { DataInitializer } from './dataInitializer'
import snippetsRouter from './routes/snippetsRouter'

const app: express.Application = express();

mongoose.connect('mongodb://localhost/initialtest2', { useNewUrlParser: true });
DataInitializer.populateInitialData();

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', snippetsRouter);

app.get('/', (_req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
