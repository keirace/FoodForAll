import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		requirements: { type: [String] },
		foodBankId: { type: mongoose.ObjectId },
	},
	schemaConfig
);

const model = mongoose.model("volunteer-opportunities", Schema);

export default model;
