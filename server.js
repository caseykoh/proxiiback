const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "/.env") });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./database");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: `http://localhost:${process.env.PORT}` }));

app.get("/", (req, res) => {
  console.log("hello test empty");
  res.send(process.env.TEST);
});

app.post("/appointments", (req, res) => {
  const {
    tattoo_type,
    image_references,
    size,
    placement,
    description,
    full_name,
    email,
    instagram_handle,
  } = req.body;
  // const tattoo_type = req.body["tattoo_type"];
  // const image_references = req.body["image_references"];
  // const size = req.body["size"];
  // const placement = req.body["placement"];
  // const description = req.body["description"];
  // const full_name = req.body["full_name"];
  // const email = req.body["email"];
  // const instagram_handle = req.body["instagram_handle"];
  console.log("Tattoo type: " + tattoo_type);
  console.log("Full name: " + full_name);
  console.log("Email: " + email);

  const insertStatement =
    "INSERT INTO appointments (tattoo_type, image_references, size, placement, description, full_name, email, instagram_handle, time_submitted) VALUES ($1, $2) RETURNING *";

  pool.query(insertStatement, [
    tattoo_type,
    image_references,
    size,
    placement,
    description,
    full_name,
    email,
    instagram_handle,
  ]);
  res.send("Response received: " + req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
