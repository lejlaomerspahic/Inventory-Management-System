import express from "express";
import {
  getAllproductionProcessItems,
  addproductionProcessItems,
  updateproductionProcessItems,
  getById,
  deleteproductionProcessItem,
} from "../controllers/productionProcessItem-controller";

const productionProcessItemRouter = express.Router();

productionProcessItemRouter.get("/", getAllproductionProcessItems);
productionProcessItemRouter.post("/dodaj", addproductionProcessItems);
productionProcessItemRouter.put("/uredi/:id", updateproductionProcessItems);
productionProcessItemRouter.get("/:id", getById);
productionProcessItemRouter.delete("/:id", deleteproductionProcessItem);
export default productionProcessItemRouter;
