import express, { NextFunction, Request, Response } from 'express';
import './utils/environment-variables';
import './db/mongo-connect';
import { createServer } from 'node:http';
import path from 'path';
import cors from 'cors';
import { AppConfig } from './config/app.config';
import { AppError } from './utils/app-error.util';
import indexRoute from './routes/index.route';
import orderRoutes from './routes/orders.route';
import dotenv from "dotenv";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(req.method, req.originalUrl);
	next();
});

app.use(indexRoute);
app.use('api/orders', orderRoutes)

app.get(AppConfig.apiUrl.health, async (req, res) => {
	res.send('OK');
});

app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
	console.error(`${req.method}:${req.originalUrl}, failed with error:${err}`);
	res.status(err.httpCode).json({ message: err.message, title: err.name, isOperational: err.isOperational });
});

server.listen(AppConfig.port, () => {
	console.log(`server is up on: http://localhost:${AppConfig.port}`);
});
