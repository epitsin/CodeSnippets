import mongoose, { Schema, Document } from 'mongoose';
import { TagModel } from './tag';
import { UserModel } from './user';

export interface SnippetModel extends Document {
  name: string;
  code: string;
  author?: UserModel['_id'];
  tags: TagModel['_id'][];
  likes: UserModel['_id'][];
}

const SnippetSchema: Schema = new Schema({
  name: {
    type: String, required: true, min: 3, unique: true, // unique index
  },
  code: { type: String, required: true, min: 10 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

SnippetSchema.index({ author: 1 });

export default mongoose.model<SnippetModel>('Snippet', SnippetSchema);
