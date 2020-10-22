// import mongoose, { Schema, Document } from 'mongoose';
// import { UserModel } from './user';

// export interface RoleModel extends Document {
//   name: string;
//   users: UserModel['_id'][];
// }

// const RoleSchema: Schema = new Schema({
//   name: { type: String, required: true, unique: true }, // unique index
//   users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// });

// export default mongoose.model<RoleModel>('Role', RoleSchema);
