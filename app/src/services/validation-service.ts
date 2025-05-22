/**
 * Validates the format of an email address.
 * 
 * @param {string} email - The email address to validate.
 * @returns {string} An error message if the email format is invalid, otherwise an empty string.
 */
export const validateEmail = (email: string): string => {
	// Regular expression for validating email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	if (!email) {
		return "Email is required";
	} else if (!emailRegex.test(email)) {
		return "Invalid email format";
	}
	return ""; // No error
};

/**
 * Validates the strength of a password.
 * 
 * @param {string} password - The password to validate.
 * @returns {string} An error message if the password is invalid, otherwise an empty string.
 */
export const validatePassword = (password: string): string => {
	if (!password) {
		return "Password is required";
	} else if (password.length < 6) {
		return "Password must be at least 6 characters long";
	}
	return ""; // No error
};

export const validateZipCode = (zipCode: string): string => {
	const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/i;
	if (!zipCode) {
		return "Zip code is required";
	} else if (!zipCodeRegex.test(zipCode)) {
		return "This is not a valid zip code format!";
	}
	return ""; // No error
};

