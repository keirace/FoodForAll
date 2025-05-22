import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		address: { type: Object, required: true },
		contact: { type: Object, required: true },
		hours_of_operation: { type: Object },
		location: { type: Object, require: true },
	},
	schemaConfig
);

const model = mongoose.model("food-banks", Schema);

export default model;
