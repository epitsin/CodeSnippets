/* eslint-disable no-unused-vars */
import { UserModel } from '../../models/user';

declare global {
  namespace Express {
    interface Request {
      authenticatedUser: UserModel
    }
  }
}
