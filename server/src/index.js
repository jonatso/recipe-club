require("dotenv-safe").config();
const express = require("express");
const pgp = require("pg-promise")(/* options */);
const cors = require("cors");
const db = pgp(process.env.DATABASE_URL);

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: [process.env.CORS_ORIGIN_URL],
	})
);


app.get("/", (req, res) => {
	res
		.status(200)
		.json({ message: `Server is running on port ${process.env.PORT}` });
});

app.listen(4000, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
