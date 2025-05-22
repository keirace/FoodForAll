import VolunteerOpportunity from "../models/volunteer-opportunity.js";

// lookup food bank location by id
export const search = async (params) => {
	const volunteer = await VolunteerOpportunity.aggregate([
		{
			$lookup: {
				from: "food-banks",
				localField: "foodBankId",
				foreignField: "_id",
				as: "food-bank",
			},
		},
		{
			$unwind: "$food-bank",
		},
		{
			$project: {
				id: "$_id",
				title: "$title",
				description: "$description",
				requirements: "$requirements",
				address: "$food-bank.address",
				_id: 0,
			},
		},
		{
			$match: {
				"address.zip_code": params.zip_code
			},
		},
	]).exec();
	return volunteer;
};

export const save = async (newOpportunity) => {
	const opportunity = new VolunteerOpportunity(newOpportunity);
	return await opportunity.save();
};

export const get = async (id) => {
	return await VolunteerOpportunity.findById(id);
};
