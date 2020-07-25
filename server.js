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
app.use(express.json())
app.use(express.json());
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
));

app.use(apiRoutes);
app.use(userRoutes);


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
