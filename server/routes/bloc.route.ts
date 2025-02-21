import express from "express";
import {
  getAllBlocs,
  getBlocById,
  createBloc,
  updateBloc,
  deleteBlocById,
} from "../controllers/bloc.controller";

const router = express.Router();

router.get("/", getAllBlocs); // Get all blocs
router.post("/", createBloc); // Create bloc

export default router;
