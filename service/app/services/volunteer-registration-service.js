import Volunteer from "../models/volunteer.js";

/**
 * Search and return registration objects.
 *
 * @param {*} params
 * @returns
 */
export const search = async (params = {}) => {
	const registrations = await Volunteer.find(params).exec();
	return registrations;
};

/**
 * Saves the volunteer registration.
 *
 * @param {*} registration
 * @returns
 */
export const save = async (registration) => {
	const volunteerRegistration = new Volunteer(registration);
	return await volunteerRegistration.save();
};

/**
 * Retrieves a single volunteer registration object.
 *
 * @param {*} id
 * @returns
 */
export const get = async (id) => {
	const registration = await Volunteer.findById(id).exec();
	return registration;
};
