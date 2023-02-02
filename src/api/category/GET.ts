import express from 'express';
import { Response, Request } from "express";
import { writePool } from "../../db";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";


const app = express();
export default app;

app.get('/categories', async (req: Request, res: Response) => {
    console.log('/categories (GET)')

    writePool.query(
        `SELECT * FROM category
        `,
        (err, result) => {
            const categories = [];

            if (err) {
                res.status(400);
            } else {
                res.status(200);

                // @ts-ignore
                categories.push(...result)
            }

            res.send(categories)
        })

})

app.get('/category/stats', async (req: Request, res: Response) => {
    console.log('/category/stats (GET)')

    const { order_by, limit } = req.query;

    writePool.query(
        `SELECT category.category_name, category.category_id, count(*) AS count FROM product
        INNER JOIN
        category ON product.product_category_id = category.category_id
        WHERE product.product_status = 'ACTIVE'
        GROUP BY category.category_name, category.category_id
        ORDER BY count ${order_by ? order_by : 'DESC'}
        ${limit ? `LIMIT ${limit}` : ''}
        `,
        (err, result) => {
            const categories = [];

            if (err) {
                res.status(400);
            } else {
                res.status(200);

                // @ts-ignore
                categories.push(...result)
            }

            res.send(categories)
        })

})