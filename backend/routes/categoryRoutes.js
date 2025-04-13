import express from 'express';
import { getCategories, addNewCategory, editCategory } from '../controllers/categoryControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getCategories);
router.post('/addcategory', verifyToken, addNewCategory);
router.put('/:id', verifyToken, editCategory);

export default router;
