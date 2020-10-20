import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface ISnippet extends Document {
  name: string;
  code: string;
  owner?: IUser['_id']; // TODO: make required
}

const SnippetSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId}
});

export default mongoose.model<ISnippet>('Snippet', SnippetSchema);
