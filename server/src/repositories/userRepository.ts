import UserSchema, { IUser } from '../models/user';
import Repository from './repository';

class UserRepository extends Repository<IUser> {
  constructor() {
    super(UserSchema);
  }
}

export default UserRepository;
