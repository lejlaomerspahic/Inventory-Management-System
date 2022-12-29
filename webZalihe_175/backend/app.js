import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import proizvodiRouter from "./routes/proizvodi-routes";
import cors from "cors";
const app = express();
const port = process.env.PORT || 80109;

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/proizvodi", proizvodiRouter);

mongoose
  .connect(
    "mongodb+srv://root:admin@cluster0.spqusox.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

