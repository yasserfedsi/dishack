import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPager extends Document {
  ip: string;
}

// Function to generate a random IPv4 address
const generateRandomIP = (): string => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}`;
};

const pagerSchema: Schema = new Schema({
  ip: {
    type: String,
    required: true,
    default: generateRandomIP,
  },
});

const pagerModel: Model<IPager> = mongoose.model<IPager>("Pager", pagerSchema);

export default pagerModel;
