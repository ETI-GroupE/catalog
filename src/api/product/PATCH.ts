import { Pool, PoolClient } from "pg";
import express from "express";
import { Response, Request } from "express";
import bodyParser from "body-parser";
import { writePool } from "../../db";
import { upsert } from "./POST";

const app = express();
export default app;

app.patch("/product/status/:id", async (req: Request, res: Response) => {
    console.log("/product/:id (PATCH)");
    const product_id = req.params.id;

    const { product_status } = req.body;

    if ([product_status].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    writePool.query(
        `
        UPDATE product
        SET product_status = ?
        WHERE product_id = ?;
        `,
        [product_status, product_id],
        (err, result) => {
            if (err) {
                res.status(400);
            } else {
                res.status(200);
            }

            res.send();
        });
});
