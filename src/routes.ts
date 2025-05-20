import StoreController from './controllers/store.controller';
import express from 'express';
const router = express.Router();

router.post('/stores', StoreController.create)
router.get('/stores', StoreController.findAll)
router.get('/stores/:id', StoreController.findById)
router.post('/stores/search', StoreController.findNearests)

export default router;
