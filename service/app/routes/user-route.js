import express from "express";
import * as user from '../controllers/user-controller.js';

const router = express.Router();

router.route('/')
    .get(user.search)
    .post(user.post);

router.route('/:id')
    .get(user.get)
    .put(user.update)
    .delete(user.del);


export default router;