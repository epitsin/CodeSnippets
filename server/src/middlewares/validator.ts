import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class Validator {
  public static validateRegisterUser = [
    check('firstName')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('First name can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('lastName')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Last name can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .bail()
      .isLength({ min: 4 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      return next();
    }];

  public static validateLoginUser = [
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .bail(),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .bail()
      .isLength({ min: 4 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      return next();
    }];

  public static validateSnippet = [
    check('name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('Name can not be empty!')
      .bail()
      .isLength({ min: 3 })
      .withMessage('Minimum 3 characters required!')
      .bail(),
    check('code')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password can not be empty!')
      .bail()
      .isLength({ min: 10 })
      .withMessage('Minimum 10 characters required!')
      .bail(),
    check('tags')
      .isArray({ min: 1 })
      .withMessage('Tags are required!')
      .bail(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      return next();
    }];
}

export default Validator;
