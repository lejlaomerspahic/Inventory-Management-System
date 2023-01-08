import express from "express";
import {
  getAllproductionProccess,
  addproductionProcess,
  updateproductionProcess,
  getById,
  deleteproductionProcess,
} from "../controllers/productionProcess-controller";

const productionProcessRouter = express.Router();

productionProcessRouter.get("/", getAllproductionProccess);
productionProcessRouter.post("/dodaj", addproductionProcess);
productionProcessRouter.put("/uredi/:id", updateproductionProcess);
productionProcessRouter.get("/:id", getById);
productionProcessRouter.delete("/:id", deleteproductionProcess);
export default productionProcessRouter;
