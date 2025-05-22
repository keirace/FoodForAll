// Import the mongoose module
import mongoose from "mongoose";
import schemaConfig from "./schema-config.js"; // Import the schema configuration
// Define the schema
const Schema = new mongoose.Schema(
	{
		firstName: { type: String, required: true }, // First name of the donor
		lastName: { type: String, required: true },
        city: {type: String },
        state: {type: String },
        zip: {type: String },
        cardNumber: {type: String, required: true },
        expiry: {type: String, required: true },// Last name of the donor
        cvv: {type: String, required: true },
		email: { type: String, required: true },
        amount: {type: Number,required:true }
	},
	schemaConfig
);
// Create the model
const model = mongoose.model("donationForm", Schema);
// Export the model
export default model;
