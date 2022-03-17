const express = require("express");
const cors = require("cors");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const config = require("../../../config/config");
const routes = require("../routes");
const { sequelize } = require("../models");

const createServer = () => {
   const app = express();
   app.use(express.json());
   app.use(
      cors({
         origin: config.CORS_ORIGIN_URL,
         methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
         credentials: true,
      })
   );
   app.use(
      session({
         name: "qid",
         store: new sequelizeStore({
            db: sequelize,
            disableTouch: true,
         }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30, // one month
            httpOnly: true,
            secure: false,
         },
         saveUninitialized: false,
         secret: config.SESSION_SECRET,
         resave: false,
      })
   );

   app.use(routes);
   return app;
};

module.exports = createServer;
