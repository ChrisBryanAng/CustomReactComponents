import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import AuthRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
	res.status(200).json({
		message: 'Test',
	});
});

app.use('/auth', AuthRoutes);

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(9000, () => console.log('Server started on port 9000'));
	} catch (error) {
		console.log(error);
	}
};

startServer();
