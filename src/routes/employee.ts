import { Router } from "express";
import { CreateEmployee, getEmployees } from "../controllers/Employee";

const routerEmployee = Router();

routerEmployee.get("/", getEmployees);

routerEmployee.post("/", CreateEmployee);

export default routerEmployee;
