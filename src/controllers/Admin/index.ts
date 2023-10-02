import { Request, Response } from "express";
import db from "../../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../../constant/constant";

export const AdminAuth = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { username, password } = req.body;

    const user = await db.administrator.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: "24h",
        });
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        return res.status(200).send({
          admin: {
            id: user.id,
            name: user.username,
          },
          token,
        });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Admin not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
