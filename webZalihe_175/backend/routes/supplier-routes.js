import express from 'express';
import {getAllSuppliers, addSuppliers, updatesuppliers, getById, deletesupplier} from '../controllers/supplier-controller';

const supplierRouter=express.Router();

supplierRouter.get("/", getAllSuppliers);
supplierRouter.post("/dodaj", addSuppliers);
supplierRouter.put("/uredi/:id", updatesuppliers)
supplierRouter.get("/:id", getById);
supplierRouter.delete("/:id", deletesupplier)
export default supplierRouter;