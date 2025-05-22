import express from "express";
import * as volunteerOpportunity from '../controllers/volunteer-opportunity-controller.js';

const router = express.Router();

router.route('/')
    .get(volunteerOpportunity.search)
    .post(volunteerOpportunity.post);

router.route('/:id')
    .get(volunteerOpportunity.get);


export default router;