import express from "express";
import cors from "cors";
import friendsRouter from "./controllers/friends";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Home page");
});

app.use("/api/friends", friendsRouter);

const PORT = 3001;

app.listen(PORT, () =>
  console.log(`REST API server ready at: http://localhost:${PORT}`)
);
