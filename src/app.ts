import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from './middleware/upload';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(multer)

import productAPI from "./api/product";
import categoryAPI from "./api/category";
import processFile from './middleware/upload';
app.use("/api/v1",
    productAPI,
    categoryAPI,
)

const API_PORT: number = parseInt(process.env.API_PORT) || 5010
app.listen(API_PORT, async () => {
    console.log('API running on port', API_PORT)
});