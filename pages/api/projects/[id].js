import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id)
    }
  });
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: `project ${id} does not exist` });
  }
}
