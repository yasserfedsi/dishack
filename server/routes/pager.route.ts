import express from "express";
import { getAllPagers, createPager } from "../controllers/pager.controller"; // ✅ Fixed typo

const pagerRouter = express.Router();

pagerRouter.get("/", getAllPagers);
pagerRouter.post("/", createPager);

export default pagerRouter;
