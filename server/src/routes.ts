import express from 'express';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const itemsController = new ItemsController();
const pointsController = new PointsController(); 
const uploads = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.post('/points', uploads.single('image'), pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

export default routes;