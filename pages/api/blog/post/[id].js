import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `post ${id} does not exist` });
  }
}
