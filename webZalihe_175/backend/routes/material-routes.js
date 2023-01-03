import express from 'express';
import {getAllMaterials, addMaterials, updateMaterials, getById, deleteMaterial} from '../controllers/material-controller';

const materialRouter=express.Router();

materialRouter.get("/", getAllMaterials);
materialRouter.post("/dodaj", addMaterials);
materialRouter.put("/uredi/:id", updateMaterials)
materialRouter.get("/:id", getById);
materialRouter.delete("/:id", deleteMaterial)
export default materialRouter;