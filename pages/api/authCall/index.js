import hasCorrectRole from "../../../helpers/hasCorrectRole";

export default async (req, res) => {
  if (hasCorrectRole(req, res)) {
    res.status(200).json({ name: "johhanes" });
  } else {
    res.status(401);
  }
  res.end();
};
