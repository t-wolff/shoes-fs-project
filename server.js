import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import shoes from './routes/shoeRoutes.js';

dotenv.config({path: './config/config.env'});

connectDB();

const app = express()

app.use(express.json());
app.use(cookieParser());

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(mongoSanitize())
app.use(xss());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
})

app.use(helmet())

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Shoes Store API'
    })
})

app.use('/api/v1/shoes', shoes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});

