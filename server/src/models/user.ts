import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

import IUser from '../interfaces/user';

export interface IUserModel extends IUser, Document {
  // eslint-disable-next-line no-unused-vars
  comparePassword(password: string, callback: any): string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}, {
  timestamps: true,
});

UserSchema.index({ email: 1 });

UserSchema.pre<IUserModel>('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (err: Error, salt: string) => {
    if (err) {
      return next(err);
    }

    console.log(this.password);
    return bcrypt.hash(this.password, salt, null, (_err: Error, hash: string) => {
      if (_err) {
        return next(_err);
      }

      console.log(hash);
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function compare(candidatePassword: string, callback: any) {
  debugger;
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};

export default mongoose.model<IUserModel>('User', UserSchema);
