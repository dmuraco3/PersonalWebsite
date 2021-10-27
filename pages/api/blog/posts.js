import { PrismaClient } from "@prisma/client";
import hasCorrectRole from 'helpers/hasCorrectRole'
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const authorized = await hasCorrectRole(req, res);
  if(authorized){
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
