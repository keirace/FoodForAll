import User from "../models/user.js";

/**
 * Search and return registration objects.
 *
 * @param {*} params
 * @returns
 */
export const search = async (params = {}) => {
	const user = await User.find(params).exec();
	return user;
};

/**
 * Saves the User registration.
 *
 * @param {*} registration
 * @returns
 */
export const save = async (registration) => {
	// If no existing user, proceed with registration
	const user = new User(registration);
	return user.save();
};

/**
 * Retrieves a single User registration object.
 *
 * @param {*} id
 * @returns
 */
export const get = async (id) => {
	const user = await User.findById(id).exec();
	return user;
};

/**
 * Updates a single User object.
 *
 * @param {*} id
 * @returns
 */
export const update = async (id, newUser) => {
	const user = User.findByIdAndUpdate(id, newUser);
	return user;
};

/**
 * Deletes a single User object.
 *
 * @param {*} id
 * @returns
 */
export const del = async (id) => {
	const user = User.findByIdAndDelete(id);
	return user;
};
