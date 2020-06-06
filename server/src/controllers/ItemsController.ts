import {Request, Response} from 'express';
import knex from '../databases/connection';

class ItemsController {
    async index(resquest: Request,response: Response){
        const items = await knex('items').select('*');

        const serializedItems = items.map(item =>{
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.100.15:3333/uploads/${item.image}`,// alterar url
            };
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;