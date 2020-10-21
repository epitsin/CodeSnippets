import UserSchema, { UserModel } from '../models/user';
import Repository from './repository';

class UserRepository extends Repository<UserModel> { // IUser?
  constructor() {
    super(UserSchema);
  }
}

export default UserRepository;
