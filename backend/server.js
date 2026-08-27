const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.log("Database Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql =
    "INSERT INTO contacts(name,email,subject,message) VALUES(?,?,?,?)";

  db.query(
    sql,
    [name, email, subject, message],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "Message Sent Successfully"
      });
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running`);
});
