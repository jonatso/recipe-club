const path = require("path");
require("dotenv").config({
   path: path.resolve(__dirname, "../" + process.env.NODE_ENV + ".env"),
});

module.exports = {
   NODE_ENV: process.env.NODE_ENV,
   DATABASE_URL: `${process.env.DATABASE_URL}`,
   PORT: process.env.PORT,
   CORS_ORIGIN_URL: process.env.CORS_ORIGIN_URL,
   SESSION_SECRET: process.env.SESSION_SECRET,
};
