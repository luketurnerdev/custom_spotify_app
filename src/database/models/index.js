import mongoose from 'mongoose'

import User from "./user_model"

const connectDB = () => {
  return mongoose.connect(process.env.DATABASE_URL);
}

const models = {User};

export {connectDB};

export default models;