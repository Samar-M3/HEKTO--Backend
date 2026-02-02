const express = require("express");
const { handleError } = require("./middleware/handleerror");
const app = express();
const path = require("path");
const router = require("./router");
const cors = require("cors");
const mailer=require("./controller/mailcontroller")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.get("/", (req, res) => {
  res.send("api is runnning");
});
app.post("/send-mail", mailer);

app.use("/api/v1", router);
app.use(handleError);

module.exports = app;
