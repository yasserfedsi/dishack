import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

// Creating server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  connectDB();
});
