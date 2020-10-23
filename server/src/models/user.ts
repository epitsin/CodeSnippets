import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// import { RoleModel } from './role';

export interface UserModel extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // roles: RoleModel['_id'][],
  roles: string[],
  comparePassword(password: string, callback: any): string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true }, // unique index
  password: { type: String, required: true, min: 4 },
  firstName: { type: String, required: true, min: 3 },
  lastName: { type: String, required: true, min: 3 },
  // roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  roles: [{
    type: String,
    enum: ['basic', 'admin'],
    default: 'basic',
    required: true,
  }],

});

UserSchema.pre<UserModel>('save', function encryptPassword(this: UserModel, next: HookNextFunction) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (err: Error, salt: string) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(this.password, salt, null, (_err: Error, hash: string) => {
      if (_err) {
        return next(_err);
      }

      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function compare(candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};

export default mongoose.model<UserModel>('User', UserSchema);
