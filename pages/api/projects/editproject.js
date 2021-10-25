import hasCorrectRole from "helpers/hasCorrectRole";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async (req, res) => {
  if (req.method === "POST") {
    if (hasCorrectRole) {
      const body = req.body;
      const updatedPost = await prisma.project.update({
        where: {
          id: body.id
        },
        data: {
          published: body.published,
          title: body.title,
          description: body.description,
          link: body.link,
          codeLink: body.codeLink,
          image: body.image,
          body: body.body
        }
      });
      res.status(200).json({ message: "good" });
    }
  }
};
