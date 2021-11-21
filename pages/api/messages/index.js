import hasCorrectRole from "helpers/hasCorrectRole";
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req,res) {
    if(await hasCorrectRole(req)) {
        const messsages = await prisma.message.findMany()
        if(messsages) {
            res.status(200).json(messsages)
        }else {
            res.status(404).json({error: "No messages found"})
        }
    } else {
        res.status(403).json({error: "You do not have the correct role"})
    }
}