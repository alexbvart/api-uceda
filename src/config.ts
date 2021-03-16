import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/api-uceda",
  PORT: process.env.PORT || 5000,
  SECRET: 'uceda-api'
};