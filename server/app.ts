import express from "express";
import cors from "cors";
import pagerRouter from "./routes/pager.route";
import router from "./routes/bloc.route";
require("dotenv").config();

export const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/pagers", pagerRouter);
app.use("/api/blocs", router);

app.get("/", (req, res) => {
    res.send("Hello World");
})
