import { Router } from "express";
import { AdminAuth } from "../controllers/Admin";

const routerAdmin = Router();

routerAdmin.post("/login", AdminAuth);

export default routerAdmin;
