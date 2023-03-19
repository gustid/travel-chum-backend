import express, { Express } from "express";
import cors from "cors";
import corsOptions from "./corsOptions";
import userRouter from "./routes/userRouter";

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);

export default app;
