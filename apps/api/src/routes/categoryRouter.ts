import { Router } from 'express';

import { categoryControllers } from '@/controllers';
import { createCategoryValidation, editCategoryValidation, pagination } from '@/middleware';

const router: Router = Router();

// Get software categories
router.get('/', pagination, categoryControllers.getCategories);

// Get software category
router.get('/:categoryId', categoryControllers.getCategory);

// Get software category softwares
router.get('/:categoryId/software', pagination, categoryControllers.getCategorySoftwares);

// Post software catergory
router.post('/', createCategoryValidation, categoryControllers.postCategory);

// Put software category
router.put('/:categoryId', editCategoryValidation, categoryControllers.putCategory);

// Delete software category
router.delete('/:categoryId', categoryControllers.deleteCategory);

export const categoryRouter = router;
