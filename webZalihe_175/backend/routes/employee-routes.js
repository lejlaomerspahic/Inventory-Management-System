import express from "express";
import {
  getAllemployees,
  addEmployees,
  updateEmployees,
  getById,
  deleteemployee,
} from "../controllers/employee-controller";

const routerEmploye = express.Router();

routerEmploye.get("/", getAllemployees);
routerEmploye.post("/dodaj", addEmployees);
routerEmploye.put("/uredi/:id", updateEmployees);
routerEmploye.get("/:id", getById);
routerEmploye.delete("/:id", deleteemployee);

export default routerEmploye;
