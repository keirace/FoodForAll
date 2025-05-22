import FoodBank from "../models/food-bank-locator.js"

export const search = async (params) => {
    return await FoodBank.find(params).exec();
}

export const save = async (newFoodBank) => {
    const foodBank = new FoodBank(newFoodBank);
    return await foodBank.save();
}

export const get = async (id) => {
    return await FoodBank.findById(id).exec();
}