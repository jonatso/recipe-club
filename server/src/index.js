const config = require("../config/config");
const db = require("./api/models");
const createServer = require("./api/helpers");

const app = createServer();

db.sequelize.sync().then(() => {
	app.listen(4000, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
});
