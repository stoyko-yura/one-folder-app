import { Router } from 'express';

import { categoryControllers } from '@/controllers';
import { pagination, postCategoryValidation, putCategoryValidation } from '@/middleware';

const router: Router = Router();

// Get categories
router.get('/', pagination, categoryControllers.getCategories);

// Get category
router.get('/:categoryId', categoryControllers.getCategory);

// Get category's softwares
router.get('/:categoryId/software', pagination, categoryControllers.getCategorySoftwares);

// Post catergory
router.post('/', postCategoryValidation, categoryControllers.postCategory);

// Put category
router.put('/:categoryId', putCategoryValidation, categoryControllers.putCategory);

// Delete category
router.delete('/:categoryId', categoryControllers.deleteCategory);

export const categoryRoutes = router;