/**
 * Interface representing a volunteer opportunity.
 */
export interface VolunteerOpportunity {
	id: string;
	title: string;
	description: string;
	requirements: string[];
	address: {
		street: string;
		city: string;
		state: string;
		zip_code: string;
	};
}

/**
 * Interface representing a food bank organization.
 */
export interface FoodBank {
	_id: string;
	name: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip_code: string;
	};
	contact: {
		phone: string;
		website?: string;
		email: string;
	};
	hours_of_operation: { [dayOfWeek: string]: string };
	location?: {
		type: string;
		coordinates: number[];
	};
}

/**
 * Interface representing a volunteer.
 */
export interface Volunteer {
	_id?: string;
	firstName?: string;
	lastName?: string;
	email: string;
	zip_code: string;
	volunteerId: string | null;
}
