import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  process.exit(1);
}

const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  console.log('MongoDB connection string is missing.');
  process.exit(1);
}

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  console.log('JWT secret string is missing.');
  process.exit(1);
}

export default {
  port: process.env.PORT,
  databaseURL: MONGO_URL,

  jwtSecret: JWT_SECRET,
  // jwtAlgorithm: process.env.JWT_ALGO,

  api: {
    prefix: '/api',
  },
};
