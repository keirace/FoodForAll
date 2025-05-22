import express from "express";
import * as volunteer from '../controllers/volunteer-controller.js';

const router = express.Router();

router.route('/')
    .get(volunteer.search)
    .post(volunteer.post);

router.route('/:id')
    .get(volunteer.get);


export default router;