const express = require("express");
const router = express.Router();
const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ messagea: "Error getting accounts" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(accounts => {
      if (accounts) {
        res.status(200).json({ data: accounts });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.post("/", (req, res) => {
  db("router")
    .insert(req.body, "id")
    .then(ids => {
      res.status(201).json({ results: ids });
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account updated" });
      } else {
        res.status(404).json({ message: "sorry, error" });
      }
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account deleted" });
      } else {
        res.status(404).json({ message: "sorry, error" });
      }
    });
});

module.exports = router;
