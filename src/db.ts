import { Pool, createPool } from "mysql2"

export const writePool: Pool = createPool({
    host: process.env.W_HOST,
    user: process.env.W_USER,
    password: process.env.W_PASSWORD,
    database: process.env.W_DATABASE,
    port: Number(process.env.W_PORT),
})

export const readPool: Pool = createPool({
    host: process.env.R_HOST,
    user: process.env.R_USER,
    password: process.env.R_PASSWORD,
    database: process.env.R_DATABASE,
    port: Number(process.env.R_PORT),
})