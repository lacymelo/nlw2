import express from "express";
import path from "path";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());

//para entender requisições do tipo json
app.use(express.json());

//exportado as rotas
app.use(routes);

//para acessar arquivos estáticos da api
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


//porta de acesso para aplicação
app.listen(3333);