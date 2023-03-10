import express from 'express';
import { Response, Request } from "express";
import { writePool } from "../../db";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";


const app = express();
export default app;

app.get('/products', async (req: Request, res: Response) => {
    console.log('/products (GET)')
    const { product_category_id, product_id, owner_id, product_name, product_status, limit, offset } = req.query;

    let productCategoryIdCondition = '';
    if (Array.isArray(product_category_id)) {
        productCategoryIdCondition = `product_category_id IN (${product_category_id.join(", ")})`
    } else {
        productCategoryIdCondition = `${product_category_id === undefined ? "" : `product_category_id = ${product_category_id}`}`
    }

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let ownerIdCondition = '';
    if (Array.isArray(owner_id)) {
        ownerIdCondition = `owner_id IN (${owner_id.join(", ")})`
    } else {
        ownerIdCondition
            = `${owner_id === undefined ? "" : `owner_id = ${owner_id}`}`
    }

    let productNameCondition = '';
    if (Array.isArray(product_name)) {
        product_name.forEach((pn, index) => {
            product_name[index] = `'%${pn}%'`
        });
        productNameCondition = `LOWER(product_name) LIKE ANY (array[${product_name.join(", ")}])`
    } else {
        productNameCondition
            = `${product_name === undefined ? "" : `LOWER(product_name) LIKE '%${product_name}%'`}`
    }

    let productStatusCondition = '';
    if (product_status) {
        productStatusCondition = `product_status = '${product_status}'`
    }

    const conditionString = [productCategoryIdCondition, productIdCondition, ownerIdCondition, productNameCondition, productStatusCondition].filter(i => i !== '')

    writePool.query(
        `SELECT * FROM product
        INNER JOIN
        category ON product.product_category_id = category.category_id
        ${conditionString.length ? 'WHERE' : ''} 
        ${conditionString.join(" AND ")}
        ORDER BY product_id ASC
        LIMIT ${limit ? limit : 10}
        OFFSET ${offset ? offset : 0};
        `,
        (err, result) => {
            const products = [];
            console.log(err)
            if (err) {
                res.status(400);
            } else {
                res.status(200);

                // @ts-ignore
                products.push(...result)
            }

            res.send(products)
        })

})

app.get('/products/length', async (req: Request, res: Response) => {
    console.log('/products/length (GET)')
    const { product_category_id, product_id, owner_id, product_name, product_status } = req.query;

    let productCategoryIdCondition = '';
    if (Array.isArray(product_category_id)) {
        productCategoryIdCondition = `product_category_id IN (${product_category_id.join(", ")})`
    } else {
        productCategoryIdCondition = `${product_category_id === undefined ? "" : `product_category_id = ${product_category_id}`}`
    }

    let productIdCondition = '';
    if (Array.isArray(product_id)) {
        productIdCondition = `product_id IN (${product_id.join(", ")})`
    } else {
        productIdCondition = `${product_id === undefined ? "" : `product_id = ${product_id}`}`
    }

    let ownerIdCondition = '';
    if (Array.isArray(owner_id)) {
        ownerIdCondition = `owner_id IN (${owner_id.join(", ")})`
    } else {
        ownerIdCondition
            = `${owner_id === undefined ? "" : `owner_id = ${owner_id}`}`
    }

    let productNameCondition = '';
    if (Array.isArray(product_name)) {
        product_name.forEach((pn, index) => {
            product_name[index] = `'%${pn}%'`
        });
        productNameCondition = `LOWER(product_name) LIKE ANY (array[${product_name.join(", ")}])`
    } else {
        productNameCondition
            = `${product_name === undefined ? "" : `LOWER(product_name) LIKE '%${product_name}%'`}`
    }

    let productStatusCondition = '';
    if (product_status) {
        productStatusCondition = `product_status = '${product_status}'`
    }

    const conditionString = [productCategoryIdCondition, productIdCondition, ownerIdCondition, productNameCondition, productStatusCondition].filter(i => i !== '')

    writePool.query(
        `SELECT COUNT(*) as count FROM product
        INNER JOIN
        category ON product.product_category_id = category.category_id
        ${conditionString.length ? 'WHERE' : ''} 
        ${conditionString.join(" AND ")};
        `,
        (err, result) => {
            const products = {};
            console.log(err)
            if (err) {
                res.status(400);
            } else {
                res.status(200);

                // @ts-ignore
                products["count"] = result[0].count
            }

            res.send(products)
        })

})