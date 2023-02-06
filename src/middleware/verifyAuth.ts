import axios from "axios";
import { Request, Response } from "express";

export default async function verifyAuth(req: Request, res: Response, next) {
    const header = req.headers;
    const xAccessToken = header['x-access-token']
    const { userId } = req.body;
    if ([xAccessToken, userId].includes(undefined)) {
        return res.sendStatus(400)
    }
    if (Array.isArray(xAccessToken)) return res.sendStatus(400);
    console.log(header)

    axios
        .post(
            "https://auth-ksbujg5hza-as.a.run.app/api/v1/verify/customer",
            {
                userId: userId,
            },
            {
                headers: {
                    "x-access-token": xAccessToken,
                },
            }
        )
        .then((response) => {
            if (response.status == 200) {
                next()
            }
        })
        .catch((error) => {
            res.sendStatus(403)
        });
}
