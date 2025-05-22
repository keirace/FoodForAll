/**
 * Handles requests related to volunteer registration operations.
 * @module controllers/volunteerRegistrationController
 */

import * as volunteerRegistration from "../services/volunteer-registration-service.js";
import {
	sendConfirmationEmail
} from "../services/email-service.js";
import {
	setResponse,
	setError
} from "./response-handler.js";

/**
 * Handles the search operation for volunteer registrations based on query parameters.
 * @param {object} request - The request object containing query parameters.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const search = async (request, response) => {
	try {
		const participants = await volunteerRegistration.search({
			...request.query
		});
		setResponse(participants, response);
	} catch (error) {
		setError(error, response);
	}
};

/**
 * Handles sending an email for volunteer registration.
 * @returns {void} This function does not return anything.
 */
export const sendEmail = () => {};

/**
 * Handles the creation of a new volunteer registration.
 * @param {object} request - The request object containing the data for the new volunteer registration.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const post = async (request, response) => {
	try {
		console.log(request.body);
		const body = {
			...request.body
		};
		const participant = await volunteerRegistration.save({
			...request.body
		});

		const subject = "Volunteer Registration Confirmation";
		const text = `Thank you for registering as a volunteer with us at Food for All. Your position has now been confirmed.\n\nSee you soon!\nFood for All`;
		const email = await sendConfirmationEmail(body.email, body.firstName, body.lastName, subject, text);

		setResponse(participant, response);
		setResponse(email, response);
	} catch (error) {
		setError(error, response);
	}
};

/**
 * Handles retrieving information about a specific volunteer registration.
 * @param {object} request - The request object containing the ID of the volunteer registration to retrieve.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const get = async (request, response) => {
	try {
		const participant = await volunteerRegistration.get(request.params.id);
		setResponse(participant, response);
	} catch (error) {
		setError(error, response);
	}
};
