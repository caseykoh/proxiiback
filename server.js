const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "/.env") });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./database");
const appointmentsRouter = require("./routes/appointments.routes");
const imageUrlsRouter = require("./routes/imageurls.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: `http://localhost:${process.env.PORT}` }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
  console.log("hello test empty");
  res.send(process.env.TEST);
});

app.use("/appointments", appointmentsRouter);
app.use("/imageurls", imageUrlsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
