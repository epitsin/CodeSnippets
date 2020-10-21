import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export interface UserModel extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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

UserSchema.pre<UserModel>('save', function save(next) {
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
