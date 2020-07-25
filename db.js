//const { POSTGRES_URI } = process.env

//const { Sequelize } = require("sequelize");

//connecting the app with the postgres sql instance hosted on aws with the elephannt sql platform

// const sequelize = new Sequelize(
//   "iyaccfrc",
//   "iyaccfrc",
//   "rj_ANOWR1f-t-biypY99caTGwyODO3-w",
//   {
//     host: "ruby.db.elephantsql.com",
//     dialect: "postgres",
//   }
// );
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(
//       "Postgres database has been connected sucessfully"
//     );
//   })
//   .catch((err) => {
//     console.error(
//       "Connection failed Database not connected  error:",
//       err
//     );
//   });

// module.exports = sequelize;

//POSTGRES_URI=postgres://iyaccfrc:rj_ANOWR1f-t-biypY99caTGwyODO3-w@ruby.db.elephantsql.com:5432/iyaccfrc

const Sequelize = require("sequelize");
const { POSTGRES_URI, POSTGRES_PASSWORD } = process.env

const sequelize = new Sequelize(
  POSTGRES_URI.replace("<password>", POSTGRES_PASSWORD)
);

sequelize.sync();

sequelize.authenticate().then(() => {
  console.log("Connection Success!");
}).catch(err => console.log(`Error: ${err.message}`));

module.exports = sequelize;