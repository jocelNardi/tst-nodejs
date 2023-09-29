import bodyParser from "body-parser";
import express from "express";
import routerEmployee from "./routes/employee";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/employee", routerEmployee);

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

export default app;
