import express from 'express';
import mongoose from 'mongoose';
import SnippetSchema from './models/snippet';

const app: express.Application = express();

const db = mongoose.connect('mongodb://localhost/initialtest2', { useNewUrlParser: true });
const snippetRouter = express.Router();
const port = process.env.PORT || 3000;

async function populateSomeInitialData() {
  const snippet = new SnippetSchema({
    name: 'test name',
    code: 'test code'
  });
  
  await snippet.save();
}

SnippetSchema.find(async (err, snippets) => {
  if (err) {
    console.log("error");
    return;
  }

  if (!snippets.length) {
    await populateSomeInitialData();
  }
});

snippetRouter.route('/snippets')
  .get(async (req, res) => {
    const query = {};
    SnippetSchema.find(query, (err, snippets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(snippets);
    });
  });
app.use('/api', snippetRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
