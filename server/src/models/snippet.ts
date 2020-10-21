import mongoose, { Schema, Document } from 'mongoose';
import { ITag } from './tag';
import { IUserModel } from './user';

export interface ISnippet extends Document {
  name: string;
  code: string;
  author?: IUserModel['_id'];
  tags: ITag[];
}

const SnippetSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  author: { type: Schema.Types.ObjectId },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

export default mongoose.model<ISnippet>('Snippet', SnippetSchema);
