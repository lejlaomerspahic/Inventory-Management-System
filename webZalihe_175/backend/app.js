import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import proizvodiRouter from "./routes/proizvodi-routes";
import materialRouter from "./routes/material-routes";
import supplierRouter from "./routes/supplier-routes";
import cors from "cors";
import productionProcessRouter from "./routes/productionProcess-routes";
import productionProcessItemRouter from "./routes/productionProccessItem-routes";

const app = express();
const port = 8082;

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/proizvodi", proizvodiRouter);
app.use("/api/sirovine", materialRouter);
app.use("/api/dobavljaci", supplierRouter);
app.use("/api/ProizvodniProces", productionProcessRouter);
app.use("/api/proizvodniProcesStavka", productionProcessItemRouter);
mongoose
  .connect(
    "mongodb+srv://root:admin@cluster0.spqusox.mongodb.net/?retryWrites=true&w=majority"
  )
  //.connect("mongodb://127.0.0.1:27017/dbzalihe_175")
  .then(() =>
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
