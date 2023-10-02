import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constant/constant";
import { VerifyErrors } from "jsonwebtoken";

export const CheckJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
  let token: string | any | undefined =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (!!token && (token.startsWith("bearer") || token.startsWith("Bearer"))) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "token not valid", err });
      } else {
        const expiresIn = "24h";
        const newToken = jwt.sign(
          {
            userID: decoded.id,
          },
          SECRET_KEY,
          {
            expiresIn: expiresIn,
          }
        );

        res.header("Authorization", "Bearer " + newToken);
        next();
      }
    });
  } else {
    return res.status(401).json("token_required");
  }
};
