import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import api from "../src/apis/api";

const app: Express = express();

// setup middleware
dotenv.config();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initial Route
app.get("/", (req: Request, res: Response) => res.send("Hello World 🌍"));

// APIs
app.use("/api/", api);

// Setup server
const PORT: any = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started successfully 😄 🚀"));
