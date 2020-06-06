import {Request, Response} from 'express';
import knex from '../databases/connection';

class PointsController{
    async index(request: Request, response: Response){
        const { city, state, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.items_id', parsedItems)
        .where('city', String(city))
        .where('state', String(state))
        .distinct()
        .select('points.*');

        return response.json(points);
    }
    
    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point is not found'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.items_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }

    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            state,
            items
        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image:'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            state
        };

        const insertIds = await trx('points').insert(point);
        const point_id = insertIds[0];

        const pointItems = items.map((items_id: number)=> {
            return {
                items_id,
                point_id: insertIds[0],
            }
        });

        await trx('point_items').insert(pointItems);
        await trx.commit();

        return response.json({
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;