import { Request, Response } from "express";
import db from "../../config/db";
import moment from "moment";

export const getEmployees = async (req: Request, res: Response) => {
  const listesEmployee = await db.employee
    .findMany({
      include: {
        checkins: true,
      },
    })
    .catch((err: Error) => err.message);
  return res.json(listesEmployee);
};

export const getEmployeesWithFilters = async (req: Request, res: Response) => {
  const { date } = req.params;
  if (date) {
    const start = moment(new Date(date)).startOf("day").toISOString();
    const end = moment(new Date(date)).endOf("day").toISOString();

    const EmployeeWIthFilters = await db.employee
      .findMany({
        where: {
          dateCreated: {
            gte: start,
            lte: end,
          },
        },
      })
      .catch((err: Error) => {
        return err.message;
      });
    return res.json(EmployeeWIthFilters);
  }

  return res.json({});
};

export const CreateEmployee = async (req: Request, res: Response) => {
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
