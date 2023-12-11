import express from 'express';
import {
	getShoes,
	addShoe,
	updateShoe,
	deleteShoe,
} from '../controllers/shoesController.js';

const router = express.Router();

router.route('/').get(getShoes).post(addShoe);

router
	.route('/:id')
	.put(updateShoe)
	.delete(deleteShoe);

export default router;
