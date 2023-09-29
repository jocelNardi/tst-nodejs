import { Request, Response } from "express";
import db from "../../config/db";
import moment from "moment";

export const CheckIn = async (req: Request, res: Response) => {
  const { id, comment } = req.query;

  if (id && !isNaN(Number(id))) {
    const resulCheckIn = await db.checkinCheckout
      .create({
        data: {
          checkin: new Date(),
          employeeId: Number(id),
          checkinComment: comment as string,
        },
      })
      .catch((err: Error) => err.message);
    return res.json(resulCheckIn);
  }
  return res.status(400).json({
    message: "user not found",
  });
};

export const CheckOut = async (req: Request, res: Response) => {
  const { id, comment } = req.query;

  if (id && !isNaN(Number(id))) {
    const resulCheckIn = await db.checkinCheckout.findFirst({
      where: {
        date: {
          gte: moment(new Date()).startOf("day").toISOString(),
          lte: moment(new Date()).endOf("day").toISOString(),
        },
        employeeId: Number(id),
        NOT: {
          checkin: null,
        },
      },
    });

    if (!resulCheckIn) {
      return res.status(401).json({
        message: "Vous n'avez pas encore Checkin",
      });
    }

    const checkinTime = new Date().getTime() - resulCheckIn.checkin!.getTime();
    const hours = Math.floor(checkinTime / (1000 * 60 * 60));

    const resulCheckOut = await db.checkinCheckout
      .update({
        where: {
          id: resulCheckIn.id,
        },
        data: {
          checkout: new Date(),
          employeeId: Number(id),
          checkoutComment: comment as string,
          durations: hours,
        },
      })
      .catch((err: Error) => err.message);
    return res.json(resulCheckOut);
  }
  return res.status(400).json({
    message: "user not found",
  });
};
