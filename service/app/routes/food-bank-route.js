import express from "express";
import * as foodBankController from '../controllers/food-bank-controller.js';

const router = express.Router();

router.route('/')
    .get(foodBankController.search)
    .post(foodBankController.post);

router.route('/:id')
    .get(foodBankController.get);


export default router;