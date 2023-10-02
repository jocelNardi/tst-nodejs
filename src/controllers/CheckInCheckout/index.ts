import { Request, Response } from "express";
import db from "../../config/db";
import moment from "moment";

const startDay = moment().startOf("day").toISOString();
const endOfDay = moment().endOf("day").toISOString();

export const CheckIn = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { id, comment } = req.body;

  if (id && !isNaN(Number(id))) {
    const checkUserExist = await db.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!checkUserExist) {
      return res.status(401).json({
        message: "User does not exist",
      });
    }

    const checkIfCheckedToday = await db.checkinCheckout.findFirst({
      where: {
        checkin: {
          gte: startDay,
          lte: endOfDay,
        },
        employeeId: Number(id),
      },
    });

    if (checkIfCheckedToday) {
      return res.status(401).json({
        message: "Attendance already recorded for today.",
      });
    }
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

export const CheckOut = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { id, comment } = req.body;

  if (id && !isNaN(Number(id))) {
    const alreadyChecked = await db.checkinCheckout.findFirst({
      where: {
        date: {
          gte: startDay,
          lte: endOfDay,
        },
        employeeId: Number(id),
        checkin: {
          not: null,
        },
        checkout: {
          not: null,
        },
      },
    });

    if (alreadyChecked) {
      return res.status(401).json({
        message: "Check in and out already done for today",
      });
    }

    const resulCheckIn = await db.checkinCheckout.findFirst({
      where: {
        date: {
          gte: startDay,
          lte: endOfDay,
        },
        employeeId: Number(id),
        NOT: {
          checkin: null,
        },
      },
    });

    if (!resulCheckIn) {
      return res.status(401).json({
        message: "You have not yet Check to enter it",
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
