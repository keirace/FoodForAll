import DonationFrom from "../models/donationform-schema.js";

/**
 * Search and return registration objects.
 *
 * @param {*} params
 * @returns
 */
export const search = async (params = {}) => {
	const registrations = await DonationFrom.find(params).exec();
	return registrations;
};

/**
 * Saves the donation persons registration.
 *
 * @param {*} registration
 * @returns
 */
export const save = async (registration) => {
	const donationFormSubmission = new DonationFrom(registration);
	return await donationFormSubmission.save();
};


/**
 * Retrieves a single donation  object.
 *
 * @param {*} id
 * @returns
 */
export const get = async (id) => {
	const registration = await DonationFrom.findById(id).exec();
	return registration;
};