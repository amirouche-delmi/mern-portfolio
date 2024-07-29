const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");

const dbConfig = require("./config/dbConfig");

const protfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());

app.use("/api/portfolio", protfolioRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
