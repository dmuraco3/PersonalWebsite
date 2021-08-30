import jwt from "next-auth/jwt";
const secret = process.env.SECRET;

export default async function hasCorrectRole(req, res, returnToken = false) {
  const token = await jwt.getToken({ req, secret });
  if (token) {
    if (token.isAdmin) {
      if (returnToken) {
        return [true, token];
      } else return true;
    } else {
      return false;
    }
  } else return false;
}
