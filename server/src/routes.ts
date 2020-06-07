import express from 'express';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const itemsController = new ItemsController();
const pointsController = new PointsController(); 
const uploads = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.post('/points', 
uploads.single('image'),
celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        state: Joi.string().required().max(2),
        items: Joi.string().required()
    })
},{
    abortEarly: false,
}),
pointsController.create);
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

export default routes;