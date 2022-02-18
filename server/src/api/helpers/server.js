const express = require("express");
const cors = require("cors");
const config = require("../../../config/config");

const routes = require("../routes");

const createServer = () => {
	const app = express();
	app.use(express.json());
	app.use(
		cors({
			origin: [config.CORS_ORIGIN_URL],
		})
	);

	app.use(routes);
	return app;
};

module.exports = createServer;
