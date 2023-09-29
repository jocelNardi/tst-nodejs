import bodyParser from "body-parser";
import express from "express";
import routerEmployee from "./routes/employee";
import routerCheck from "./routes/checkincheckout";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/employee", routerEmployee);
app.use("/api/check", routerCheck);

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

export default app;
