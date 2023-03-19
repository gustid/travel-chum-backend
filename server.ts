import * as dotenv from "dotenv";
import app from "./app";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const DB: string =
  process.env.DATABASE?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD || ""
  ) || "";

mongoose.connect(DB).then(() => {
  console.log("DB connection succesful!");
});

const PORT: string = process.env.PORT || "8000";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
