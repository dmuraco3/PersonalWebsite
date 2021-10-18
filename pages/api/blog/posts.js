import { PrismaClient } from "@prisma/client";
import hasCorrectRole from 'helpers/hasCorrectRole'
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if(hasCorrectRole){
    let posts = await prisma.post.findMany({
      orderBy: [
        {
          id: "desc"
        }
      ]
    })
    res.status(200).json(posts)
  } else {
    const posts = await prisma.post.findMany({
      where: {
        published: true
      }
    });
    res.status(200).json(posts);

  }
}
