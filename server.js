const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./db");

const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require('./routes/userRoutes');

// Init
const app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type"]
  })
);

app.use(apiRoutes);
app.use(userRoutes);


app.listen(1234, function() {
  console.log("Server started");
});
