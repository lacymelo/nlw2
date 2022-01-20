import { Response, Request } from "express";
import knex from "../database/connection";

export default class ConnectionsController {
    async index(req: Request, res: Response){
        const totalConnections = await knex('connections').count('* as total');

        const { total } = totalConnections[0];

        return res.json({total});
    }

    //cria uma conexão com o professor
    async create(req: Request, res: Response){
        const { user_id } = req.body;

        await knex('connections').insert({
            user_id
        }).then((user) => {
            return res.status(201).json({
                message: 'Success connection'
            });
        }).catch((err) => {
            return res.status(400).json({
                message: 'error: tente mais tarde'
            });
        });    
    }
}