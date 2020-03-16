const express = require("express");
const accountRouter = require("../router/accountRouter");
// const db = require("./data/dbConfig.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server working" });
});

//  Routing
server.use("/accounts", accountRouter);

module.exports = server;
