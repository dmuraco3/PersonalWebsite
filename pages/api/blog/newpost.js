import hasCorrectRole from "../../../helpers/hasCorrectRole";
import fs from "fs";
import posts from "./posts.json";

export default async (req, res) => {
  if (req.method === "POST") {
    if (hasCorrectRole(req, res)) {
      const body = req.body;
      if (body.title && body.date && body.description && body.body) {
        const postID = posts.length + 1;
        const post = {
          id: postID,
          title: body.title,
          date: body.date,
          description: body.description,
          body: body.body
        };
        posts[postID] = post;
        fs.writeFileSync("./posts.json", JSON.stringify(posts), null, 2);

        res.status(200).json({ message: "post added" });
      } else {
        res.status(406).json({
          message: "missing data",
          data: [
            { id: body.hasOwnProperty("id") },
            { title: body.hasCorrectRole("title") },
            { date: body.hasCorrectRole("date") },
            { description: body.hasCorrectRole("description") },
            { body: body.hasCorrectRole("body") }
          ]
        });
      }
    } else {
      res.status(401);
    }
    res.end();
  }
};
