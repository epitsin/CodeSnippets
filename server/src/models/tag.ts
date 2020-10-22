import mongoose, { Schema, Document } from 'mongoose';
import { SnippetModel } from './snippet';

export interface TagModel extends Document {
  name: string;
  snippets: SnippetModel['_id'][]
}

const TagSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  snippets: [{ type: Schema.Types.ObjectId, ref: 'Snippet' }],
});

TagSchema.index({ name: 1 });

export default mongoose.model<TagModel>('Tag', TagSchema);
