import { Request, Response } from "express";
import db from "../../config/db";
import moment from "moment";

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { date } = req.query;
  if (date) {
    const start = moment(new Date(date as string))
      .startOf("day")
      .toISOString();
    const end = moment(new Date(date as string))
      .endOf("day")
      .toISOString();

    const EmployeeWIthFilters = await db.employee
      .findMany({
        where: {
          dateCreated: {
            gte: start,
            lte: end,
          },
        },
        include: {
          checkins: true,
        },
      })
      .catch((err: Error) => {
        return err.message;
      });

    return res.json(EmployeeWIthFilters);
  }

  const listesEmployee = await db.employee
    .findMany({
      include: {
        checkins: true,
      },
    })
    .catch((err: Error) => err.message);
  return res.json(listesEmployee);
};

export const CreateEmployee = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  const { name, firstName, department } = req.body;
  const NewEmployee = await db.employee
    .create({
      data: {
        department,
        firstName,
        name,
      },
    })
    .catch((err: Error) => err.message);
  return res.json(NewEmployee);
};
