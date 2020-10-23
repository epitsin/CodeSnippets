import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';

import { SnippetModel } from './snippet';

export interface TagModel extends Document {
  name: string;
  snippets: SnippetModel['_id'][];
}

const TagSchema: Schema = new Schema({
  name: {
    type: String, required: true, min: 2, unique: true, // unique index
  },
  snippets: [{ type: Schema.Types.ObjectId, ref: 'Snippet' }],
});

// TODO: make it work for findOneAndUpdate as well
TagSchema.pre<TagModel>('save', function lowerCase(this: TagModel, next: HookNextFunction) {
  if (!this.isModified('name')) {
    return next();
  }

  this.name = this.name.toLowerCase();
  return next();
});

export default mongoose.model<TagModel>('Tag', TagSchema);
