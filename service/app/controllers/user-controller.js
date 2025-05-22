/**
 * Handles requests related to user operations.
 * @module controllers/userController
 */

import * as UserServices from "../services/user-service.js";
import {
	sendConfirmationEmail
} from "../services/email-service.js";
import {
	setResponse,
	setError
} from "./response-handler.js";

/**
 * Handles the search operation for users based on query parameters.
 * @param {object} request - The request object containing query parameters.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const search = async (request, response) => {
	try {
		const user = await UserServices.search({
			...request.query
		});
		setResponse(user, response);
	} catch (error) {
		setError(error, response);
	}
};

/**
 * Handles the creation of a new user.
 * @param {object} request - The request object containing the data for the new user.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const post = async (request, response) => {
	try {
		const body = {
			...request.body
		};
		const email = body.email;

		// Check if a user with the provided email already exists
		const existingUser = await UserServices.search({
			'email': email
		});
		if (existingUser.length > 0) {
			return response.status(400).json({
				message: "Email already in use"
			});
		}
		const user = await UserServices.save({
			...request.body
		});
		const subject = "Welcome to Food For All! Start Making a Difference Today";
		const text = `Thank you for registering on Food For All! We're thrilled to have you join our community of passionate individuals dedicated to making a difference in the fight against hunger.
		
		At Food For All, we believe that everyone deserves access to nutritious food, and with your support, we can work together to make this a reality. Whether you're volunteering, donating, or spreading awareness, every action you take brings us one step closer to ending hunger.
		
		Here are a few ways you can get involved:
		
		1. Volunteer at local food banks or community events.
		2. Make a donation to support our programs and initiatives.
		3. Spread the word about Food For All on social media and in your community.
		
		Feel free to explore our website to learn more about our mission, upcoming events, and how you can make a difference. If you have any questions or need assistance, don't hesitate to reach out to our team.
		
		Thank you for your support, and welcome to the Food For All family!
		
		Best regards,
		The Food For All Team
		`;
		await sendConfirmationEmail(body.email, body.firstName, body.lastName, subject, text);

		setResponse(user, response);
	} catch (error) {
		setError(error, response);
	}
};

/**
 * Handles retrieving information about a specific user.
 * @param {object} request - The request object containing the ID of the user to retrieve.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const get = async (request, response) => {
	try {
		const user = await UserServices.get(request.params.id);
		setResponse(user, response);
	} catch (error) {
		setError(error, response);
	}
};

/**
 * Handles updating information about a specific user.
 * @param {object} request - The request object containing the ID of the user to update and the updated data.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const update = async (request, response) => {
	try {
		const body = {
			...request.body
		};
		const user = await UserServices.update(request.params.id, body);
		setResponse(user, response);
	} catch (error) {
		setError(error, response);
	}
};

/**
 * Handles deleting a specific user.
 * @param {object} request - The request object containing the ID of the user to delete.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const del = async (request, response) => {
	try {
		const user = await UserServices.del(request.params.id);
		setResponse(user, response);
	} catch (error) {
		setError(error, response);
	}
};
