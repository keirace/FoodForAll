import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String, required: true },
		zip_code: { type: String, required: true },
		volunteerId: { type: mongoose.ObjectId },
	},
	schemaConfig
);

const model = mongoose.model("volunteers", Schema);

export default model;
