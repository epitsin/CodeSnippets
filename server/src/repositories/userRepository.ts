import UserSchema, { IUserModel } from '../models/user';
import Repository from './repository';

class UserRepository extends Repository<IUserModel> { // IUser?
  constructor() {
    super(UserSchema);
  }
}

export default UserRepository;
