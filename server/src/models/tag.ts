import mongoose, { Schema, Document } from 'mongoose';
import { ISnippet } from './snippet';

export interface ITag extends Document {
  name: string;
  snippets: ISnippet[]
}

const TagSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  snippets: [{ type: Schema.Types.ObjectId, ref: 'Snippet' }],
});

export default mongoose.model<ITag>('Tag', TagSchema);
