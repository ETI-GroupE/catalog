import { Pool, createPool } from "mysql2"

export const writePool: Pool = createPool({
    host: '34.87.161.240',
    user: 'root',
    password: 'password',
    database: 'db',
    port: 3306,
})

export const readPool: Pool = createPool({
    host: '34.87.161.240',
    user: 'root',
    password: 'password',
    database: 'db',
    port: 3306,
})