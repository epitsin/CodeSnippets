import * as express from 'express';
import SnippetSchema from '../models/snippet';

const snippetsRouter = express.Router();

snippetsRouter.route('/snippets')
  .get(async (req, res) => {
    SnippetSchema.find(req.query, (err, snippets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(snippets);
    });
  })
  .post(async (req, res) => {
    const snippet = new SnippetSchema(req.body);

    await snippet.save();
    return res.status(201).json(snippet);
  });

snippetsRouter.use('/snippets/:id', (req, res, next) => {
  SnippetSchema.findById(req.params.id, (err, snippet) => {
    if (err) {
      return res.send(err);
    }

    if (snippet) {
      req.snippet = snippet;
      return next();
    }

    return res.sendStatus(404);
  });
});

snippetsRouter.route('/snippets/:id')
  .get((req, res) => res.json(req.snippet))
  .put((req, res) => {
    const { snippet } = req;
    snippet.name = req.body.name;
    snippet.code = req.body.code;
    snippet.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(snippet);
    });
  })
  .delete((req, res) => {
    req.snippet.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  });

export default snippetsRouter;
