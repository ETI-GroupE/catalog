import express from "express";
import GET from "./GET"
import POST from "./POST";
import PATCH from "./PATCH";
import PUT from "./PUT"

const app = express();
app.use(
    GET,
    POST,
    PUT,
    PATCH,
);
export default app;