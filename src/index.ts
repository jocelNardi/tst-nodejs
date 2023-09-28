import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/db";

const main = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());

  // Définissez vos routes Express ici

  await sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync");
  });

  app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
  });
};

main();
