require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
module.exports={
    MONGODB_URL,
    PORT,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS,
}