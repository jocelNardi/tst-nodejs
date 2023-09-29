import { Router } from "express";
import {
  CreateEmployee,
  getEmployees,
  getEmployeesWithFilters,
} from "../controllers/Employee";

const routerEmployee = Router();

routerEmployee.get("/", getEmployees);
routerEmployee.get("/:date", getEmployeesWithFilters);

routerEmployee.post("/", CreateEmployee);

export default routerEmployee;
