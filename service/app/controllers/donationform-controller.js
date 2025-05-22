// Initialize express router
import * as donationFormSerivce from "../services/donationform-service.js";
import { sendConfirmationEmail } from "../services/email-service.js";// Import donationForm service
import { setResponse, setError } from "./response-handler.js";// Get all participants
// Get all participants
export const search = async (request, response) => {
	try {
		const participants = await donationFormSerivce.search({ ...request.query });
		setResponse(participants, response);
	} catch (error) {
		setError(error, response);
	}
};
// Create new participant
export const sendEmail = () => {};

// Generate a random receipt number
const  receiptID = () => {
    // Generate a random number between 10000 and 99999 (inclusive)
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
  }

  // Create new participant 
export const post = async (request, response) => {
    console.log()
	try {
		console.log(request.body);
		const body = { ...request.body };
		const participant = await donationFormSerivce.save({ ...request.body });

		const subject = " Donation Confirmation receipt ";
		const text = `Donation successful.Thankful for your generous donation towards feeding the needy  with us at Food for All. $${body.amount}. 
                      With receipt number ${receiptID()}`;
		const email = await sendConfirmationEmail(body.email, body.firstName, body.lastName, subject, text);

		setResponse(participant, response);
		setResponse(email, response);
	} catch (error) {
		setError(error, response);
	}
};
// Get a single participant
export const get = async (request, response) => {
	try {
		const participant = await donationFormSerivce.get(request.params.id);
		setResponse(participant, response);
	} catch (error) {
		setError(error, response);
	}
};
