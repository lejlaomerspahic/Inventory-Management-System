import express from 'express';
import {getAllProducts, addProducts, updateProducts, getById, deleteProduct} from '../controllers/proizvodi-controller';

const proizvodiRouter=express.Router();

proizvodiRouter.get("/", getAllProducts);
proizvodiRouter.post("/dodaj", addProducts);
proizvodiRouter.put("/uredi/:id", updateProducts)
proizvodiRouter.get("/:id", getById);
proizvodiRouter.delete("/:id", deleteProduct)
export default proizvodiRouter;