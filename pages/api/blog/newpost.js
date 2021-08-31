import hasCorrectRole from "../../../helpers/hasCorrectRole";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "POST") {
    if (hasCorrectRole(req, res)) {
      const body = req.body;
      if (body.title && body.createdAt && body.description && body.body) {
        const post = {
          title: body.title,
          description: body.description,
          body: body.body
        };
        const added = await prisma.post.create({ data: post });
        console.log(added);
        res.status(200).json({ message: "post added" });
      } else {
        res.status(406).json({
          message: "missing data",
          data: [
            { id: body.hasOwnProperty("id") },
            { title: body.hasOwnProperty("title") },
            { date: body.hasOwnProperty("date") },
            { description: body.hasOwnProperty("description") },
            { body: body.hasOwnProperty("body") }
          ]
        });
      }
    } else {
      res.status(401);
    }
    res.end();
  }
};
