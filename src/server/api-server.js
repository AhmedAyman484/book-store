import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(process.cwd(), "db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Book Store API is running" });
});

// Books
app.get("/books", (req, res) => {
  res.json(db.books);
});

app.get("/books/:id", (req, res) => {
  const book = db.books.find(b => String(b.id) === req.params.id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book);
});

// Authors
app.get("/authors", (req, res) => {
  res.json(db.authors);
});

app.get("/authors/:id", (req, res) => {
  const author = db.authors.find(a => String(a.id) === req.params.id);

  if (!author) return res.status(404).json({ error: "Author not found" });

  res.json(author);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Book Store API running on port ${PORT}`);
});