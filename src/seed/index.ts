import db from "../config/db";
import bcrypt from "bcrypt";
import { ADMIN } from "../constant/constant";

export const SeedData = async () => {
  db.administrator
    .upsert({
      where: { username: ADMIN.USERNAME },
      update: {},
      create: {
        password: await bcrypt.hash(ADMIN.PASSWORD, 10),
        username: ADMIN.USERNAME,
      },
    })
    .then(() => {
      console.log("save seed data successfully", ADMIN);
    })
    .catch((err: Error) => {
      console.log("error on seed Data ===>", err);
    });
};

SeedData();
