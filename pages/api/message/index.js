import rateLimit from "express-rate-limit";



function initMiddleware(middleware) {
    return (req, res) => new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }
            return resolve(result)
        })
    })
}

const limiter = initMiddleware(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
)

export default async function handler(req, res) {
    req.ip = req.connection.remoteAddress
    await limiter(req, res)
    if(req.method === 'POST') {
        const body = JSON.parse(req.body)
        if(body.name && body.email && body.message) {
            res.status(200).json({good: "good"})
        } else {
            res.status(400).json({error: "bad"})
        }
    } else {
        res.status(405).json({error: "method not allowed"})
    }
}