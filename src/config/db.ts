import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://nardi:admintest@postgres:5432/ecoleabc"
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log("error connexion database ==>", err);
  });

export default sequelize;
