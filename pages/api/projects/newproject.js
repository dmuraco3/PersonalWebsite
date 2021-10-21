import hasCorrectRole from "helpers/hasCorrectRole";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "POST") {
    if (hasCorrectRole(req, res)) {
      const body = req.body;
      if (
        body.hasOwnProperty("published") &&
        body.hasOwnProperty("title") &&
        body.hasOwnProperty("description") &&
        body.hasOwnProperty("image") &&
        body.hasOwnProperty("link") &&
        body.hasOwnProperty("codeLink") && 
        body.hasOwnProperty("body")
      ) {
        const project = {
          published: body.published,
          title: body.title,
          description: body.description,
          link: body.link,
          codeLink: body.codeLink,
          image: body.image,
          body: body.body
        };
        const added = await prisma.project.create({ data: project });
        console.log(added);
        res.status(200).json(added);
      } else {
        console.log(body);
        res.status(406).json({
          message: "missing data",

          data: [
            { published: body.hasOwnProperty("published") },
            { title: body.hasOwnProperty("title") },
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
