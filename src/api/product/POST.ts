import express from 'express';
import { Response, Request } from "express";
import { writePool } from "../../db";
import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import path from "path"
console.log(path.join(__dirname, "./google-cloud-key.json"))
const storage = new Storage({ keyFilename: path.join(__dirname, "google-cloud-key.json"), projectId: "eti-assignment2" })
const bucket = storage.bucket("buyee-image-assets")

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

    // @ts-expect-error
    const imageUrl = await uploadImage(req.file)
    if (imageUrl === "No file") res.sendStatus(400);

    writePool.query(
        `
        INSERT INTO product(product_name, product_image_url, owner_id, product_description, product_price, product_category_id, product_ship_location, product_original_stock, product_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [product_name, imageUrl, owner_id, product_description, product_price, product_category_id, product_ship_location, product_stock, product_stock],
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

export const uploadImage = (file) => new Promise((resolve, reject) => {
    if (file === undefined) {
        resolve("No file")
    }
    const { originalname, buffer } = file
    console.log(originalname)
    const cleanName = originalname.replace(/ /g, "_")
    console.log(cleanName)
    console.log(cleanName.split(".").at(-1))
    const extension = cleanName.split(".").at(-1)
    console.log(extension)
    const finalFile = `${new Date().getTime()}.${extension}`
    console.log(finalFile)
    const blob = bucket.file(finalFile)
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    blobStream.on('finish', () => {
        // bucket.file(originalname.replace(/ /g, "_")).makePublic()
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve(publicUrl)
    })
        .on('error', (e) => {
            console.log(e)
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
})