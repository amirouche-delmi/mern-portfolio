const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path")
const dbConfig = require("./config/dbConfig");
const protfolioRoute = require("./routes/portfolioRoute");
const cors = require('cors')

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/portfolio", protfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
