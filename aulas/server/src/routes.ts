import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import ClassesController from '../src/controllers/ClassesController';
import ConnectionsController from "./controllers/ConnectionsController";

const routes = express.Router();
const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

//rota para criar classe
routes.post('/classes', upload.single('avatar'), classesController.create);
//busca por class
routes.get('/classes', classesController.index);
//cria uma conexão com o professor
routes.post('/connections', connectionsController.create);
//total de conexões
routes.get('/connections', connectionsController.index);

export default routes;