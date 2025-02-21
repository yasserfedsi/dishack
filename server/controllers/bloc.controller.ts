import { Request, Response, NextFunction } from "express";
import blocModel, { IBloc } from "../models/bloc.model";
import pagerModel from "../models/pager.model";

// Get all Blocs (with associated Pager)
export const getAllBlocs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blocs = await blocModel.find().populate("pager"); // Populate Pager details
    res.status(200).json({ success: true, data: blocs });
  } catch (error: any) {
    next(error);
  }
};

// Get a single Bloc by ID (with associated Pager)
export const getBlocById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bloc = await blocModel.findById(id).populate("pager"); // Populate Pager details

    if (!bloc) {
      return res.status(404).json({ message: "Bloc not found" });
    }
    res.status(200).json({ success: true, data: bloc });
  } catch (error: any) {
    next(error);
  }
};

// Create a new Bloc (Auto-assign a random Pager)
export const createBloc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description } = req.body || {};

    // Get a random Pager from the database
    const pagers = await pagerModel.find();
    if (pagers.length === 0) {
      return res
        .status(400)
        .json({ message: "No pagers available, create a pager first!" });
    }
    const randomPager = pagers[Math.floor(Math.random() * pagers.length)];

    // Create a new Bloc with the random Pager
    const newBloc: IBloc = new blocModel({
      name: `Chambre ${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}`, // Random name (A-Z)
      description: description || "Description de la chambre",
      pager: randomPager._id, // Assign the random Pager
    });

    await newBloc.save();
    res.status(201).json({ success: true, data: newBloc });
  } catch (error: any) {
    next(error);
  }
};
