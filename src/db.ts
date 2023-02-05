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

// poolCluster.add('node1', {
//     host: process.env.W_HOST,
//     user: process.env.W_USER,
//     password: process.env.W_PASSWORD,
//     database: process.env.W_DATABASE,
//     port: Number(process.env.W_PORT),
// })
// poolCluster.add('node2', {
//     host: process.env.W_HOST,
//     user: process.env.W_USER,
//     password: process.env.W_PASSWORD,
//     database: process.env.W_DATABASE,
//     port: Number(process.env.W_PORT),
// })
// poolCluster.add('node3', {
//     host: process.env.W_HOST,
//     user: process.env.W_USER,
//     password: process.env.W_PASSWORD,
//     database: process.env.W_DATABASE,
//     port: Number(process.env.W_PORT),
// })
// export const writePool: Pool = poolCluster.of('node1', 'node2', 'node3')

// export const readPool: Pool = poolCluster.of('node1', 'node2', 'node3')