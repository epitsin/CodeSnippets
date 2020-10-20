/* eslint-disable no-unused-vars */
import { ISnippet } from '../../models/snippet';

declare global {
  namespace Express {
    interface Request {
      snippet: ISnippet
    }
  }
}
