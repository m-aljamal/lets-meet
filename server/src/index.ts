import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../utils/auth";
import cors from "cors";
const app = express();
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}))
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
