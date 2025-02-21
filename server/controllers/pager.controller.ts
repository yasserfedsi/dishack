import { Request, Response, NextFunction } from "express";
import pagerModel, { IPager } from "../models/pager.model";

// Get all Pagers
export const getAllPagers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pagers = await pagerModel.find();
    res.status(200).json({ success: true, data: pagers });
  } catch (error: any) {
    next(error);
  }
};

// Get a single Pager by ID
export const getPagerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const pager = await pagerModel.findById(id);

    if (!pager) {
      return res.status(404).json({ message: "Pager not found" });
    }
    res.status(200).json({ success: true, data: pager });
  } catch (error: any) {
    next(error);
  }
};

// Create a new Pager
export const createPager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ip } = req.body || {};
    const newPager: IPager = new pagerModel({ ip });
    await newPager.save();
    res.status(201).json({ success: true, data: newPager });
  } catch (error: any) {
    next(error);
  }
};
