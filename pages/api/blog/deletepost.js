import hasCorrectRole from "helpers/hasCorrectRole";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export default async(req, res) => {
    if(req.method === 'POST'){
        if(hasCorrectRole){
            const body = req.body;
            const deletePost = await prisma.post.delete({
                where: {
                    id: body.id
                }
            })
            if(deletePost){
                res.status(200).json({message: "successful"})
            }
        }
    }
}