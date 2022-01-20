import { request, Request, Response } from "express";
import Knex from '../database/connection';
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{

    async index(req: Request, res: Response){
        let filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;


        if(!week_day || !subject || !time){
            return res.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time as string);

        const classes = await Knex('classes')
        .join('users', 'classes.user_id', '=', 'users.id')
        .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
        .where('subject', subject)
        .where('week_day', Number(week_day))
        .where('from', '<=', timeInMinutes).andWhere('to', '>', timeInMinutes)
        .select(['classes.*', 'users.*']);

        const serializeClasses = classes.map(classe => {
            return {
                ...classe,
                avatar_url: `http://192.168.10.165:3333/uploads/${classe.avatar}`
            }
        })

        return res.json(serializeClasses);
    }

    async create(req: Request, res: Response){
        let {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
        
        const trx = await Knex.transaction();

        try{
            const user = {
                name,
                avatar: req.file?.filename,
                whatsapp,
                bio
            }
    
            //cadastro do usuário
            const insertUser = await trx('users').insert(user);
    
            const user_id = insertUser[0];
            //cadastro da classe
            const insertClass = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
    
            const class_id = insertClass[0]; 

            //convertendo uma string JSON em JSON
            const listSchedule = JSON.parse(schedule);
    
            const classSchedule = listSchedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id
                }
            });
    
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return res.json({
                user_id: user_id,
                class_id: class_id,
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule: listSchedule
            });
        }catch (err) {
            await trx.rollback();

            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }
}
