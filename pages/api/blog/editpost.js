import hasCorrectRole from "helpers/hasCorrectRole";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export default async(req, res) => {
    if(req.method === 'POST') {
        if(hasCorrectRole) {
            const body = req.body;
            const updatedPost = await prisma.post.update({
                where : {
                    id: body.id
                },
                data: {
                    title: body.title,
                    description: body.description,
                    published: body.published,
                    body: body.body
                }
            })
            res.status(200).json({message: 'good'})
        }
    }
}