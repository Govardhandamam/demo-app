import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectionToDB from './config/connectionToDb.js';
import routes from "./routes/index.js"

dotenv.config();

const startServer = () => {
	const app = express();
	app.use(express.json());
	app.use(cors());

	app.get('/', (req, res) => {
		res.send('Hello');
	});

	app.use("/", routes);

	connectionToDB()
		.then(() => {
			console.log('Connected to DB');
		})
		.catch((err) => {
			console.log(err.message);
		});

	app.listen(process.env.PORT, () => {
		console.log(`Server Running at http://localhost:${process.env.PORT}`);
	});
};

startServer();
