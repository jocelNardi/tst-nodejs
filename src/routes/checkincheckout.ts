import { Router } from "express";
import { CheckIn, CheckOut } from "../controllers/CheckInCheckout";

const routerCheck = Router();

routerCheck.post("/in", CheckIn);
routerCheck.put("/out", CheckOut);

export default routerCheck;
