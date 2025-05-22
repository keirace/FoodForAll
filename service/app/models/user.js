import mongoose from "mongoose";
import schemaConfig from "./schema-config.js";

const Schema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	schemaConfig
);

const model = mongoose.model("users", Schema);

export default model;