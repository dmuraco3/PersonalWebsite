import posts from "./posts.json";

export default async function handler(req, res) {
  res.status(200).json(posts);
}
