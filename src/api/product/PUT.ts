import { Pool, PoolClient } from "pg";
import express from "express";
import { Response, Request } from "express";
import bodyParser from "body-parser";
import { writePool } from "../../db";
import { upsert } from "./POST";

const app = express();
export default app;

app.put("/product/:id", async (req: Request, res: Response) => {
    console.log("/product/:id (PUT)");
    const product_id = req.params.id;

    const { product_name, product_description, product_price, product_category_id, product_ship_location, OG_product_original_stock, product_original_stock } = req.body;

    if ([product_name, product_description, product_price, product_category_id, product_ship_location, OG_product_original_stock, product_original_stock].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    writePool.query(
        `
        UPDATE product
        SET product_name = ?, product_description = ?, product_price = ?, product_category_id = ?, product_ship_location = ?, product_original_stock = product_original_stock - ?, product_stock = product_stock - ? 
        WHERE product_id = ?;
        `,
        [product_name, product_description, product_price, product_category_id, product_ship_location, OG_product_original_stock - product_original_stock, OG_product_original_stock - product_original_stock, product_id],
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(400);
            } else {
                res.status(200);
            }

            res.send();
        });
});
