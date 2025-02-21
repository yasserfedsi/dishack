import mongoose, { Document, Model, Schema } from "mongoose";
import pagerModel, { IPager } from "./pager.model"; // Import Pager model

export interface IBloc extends Document {
  name: string;
  description: string;
  pager: IPager; // Add reference to Pager
}

// Function to generate Bloc names (A, B, C...)
const generateBlocName = (index: number): string => {
  let name = "";
  while (index >= 0) {
    name = String.fromCharCode(65 + (index % 26)) + name; // Convert to letter (A-Z)
    index = Math.floor(index / 26) - 1;
  }
  return `Chambre ${name}`;
};

const blocSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Description de la chambre",
  },
  pager: {
    type: Schema.Types.ObjectId,
    ref: "Pager", // Reference to the Pager model
    required: true,
  },
});

const blocModel: Model<IBloc> = mongoose.model<IBloc>("Bloc", blocSchema);
export default blocModel;
