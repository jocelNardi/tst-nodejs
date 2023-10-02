import bodyParser from "body-parser";
import express from "express";
import routerEmployee from "./routes/employee";
import routerCheck from "./routes/checkincheckout";
import routerAdmin from "./routes/Admin";
import { CheckJWT } from "./middleware/security";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/admin", routerAdmin);
app.use("/api/employee", CheckJWT, routerEmployee);
app.use("/api/check", routerCheck);

const server = app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

export { app, server };
