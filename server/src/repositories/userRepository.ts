import { UserDto } from '../interfaces/dtos/userDto';
import UserSchema, { UserModel } from '../models/user';
import Repository from './repository';

class UserRepository extends Repository<UserModel> {
  constructor() {
    super(UserSchema);
  }

  public async create(dto: UserDto) {
    const document = new this.model({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
    });
    const snippet = await document.save();

    return snippet;
  }
}

export default UserRepository;
