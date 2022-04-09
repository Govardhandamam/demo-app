import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const userName = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const conectionUri = `mongodb://${userName}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

const connectionToDB = () => mongoose.connect(conectionUri);

export default connectionToDB;
