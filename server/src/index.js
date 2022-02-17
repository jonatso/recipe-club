require("dotenv-safe").config();
const express = require("express");
const cors = require("cors");
const db = require("./api/models");
const routes = require("./api/routes");

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: [process.env.CORS_ORIGIN_URL],
	})
);

app.use(routes);

db.sequelize.sync().then(() => {
	app.listen(4000, () => {
		console.log(`Server running on port ${process.env.PORT}`);
	});
});
