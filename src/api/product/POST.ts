import express from 'express';
import { Response, Request } from "express";
import { writePool } from "../../db";

const app = express();
export default app;

app.post('/product', async (req: Request, res: Response) => {
    console.log('/product (POST)')
    upsert(req, res)
})

export async function upsert(req: Request, res: Response) {
    const { product_name, owner_id, product_description, product_price, product_category_id, product_ship_location, product_stock } = req.body;

    if ([product_name, owner_id, product_description, product_price, product_category_id, product_ship_location, product_stock].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    writePool.query(
        `
        INSERT INTO product(product_name, owner_id, product_description, product_price, product_category_id, product_ship_location, product_original_stock, product_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [product_name, owner_id, product_description, product_price, product_category_id, product_ship_location, product_stock, product_stock],
        (err, result) => {
            console.log(err)
            if (err) {
                res.status(400);
            } else {
                res.status(200);
            }

            res.send()
        })
}

app.post('/product/product_stock/decrement/:id', async (req: Request, res: Response) => {
    console.log('/product/product_stock/decrement/:id (POST)')
    const product_id = req.params.id
    const { by } = req.query;

    if ([by].includes(undefined)) {
        res.status(400);
        res.send();
        return;
    }

    writePool.query(
        `
        UPDATE product
        SET product_stock = product_stock - ?
        WHERE product_id = ? AND product_stock - ? >= 0;
        `,
        [by, product_id, by],
        (err, result) => {
            console.log(err)
            // @ts-ignore
            if (err) {
                res.status(400);
            } else {
                res.status(200);
            }

            res.send()
        })
})