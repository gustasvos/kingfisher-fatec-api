//Ponto de entrada do backend, (como o main.tsx do front)
import express, {Request, Response} from 'express'
import usuariosRoutes from './modules/routers/usuariosRoutes';
import EventoRoutes from './modules/routers/EventoRoutes';
import dashboardOpRoutes from './modules/routers/dashboardOpRoutes';
import formRoutes from './modules/routers/formRoutes'
import path from 'path';
import { uploadsDir,dataDir } from './config/paths'
import { initFolders } from './utils/initFolders';
initFolders();
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // ou '*' para liberar geral (não recomendado em produção)
  methods: ['GET','POST','PUT','DELETE', 'PATCH','OPTIONS'],
  credentials: true // se você usa cookies, tokens etc
}));

app.use('/',EventoRoutes)
app.use('/',usuariosRoutes)
app.use("/uploads", express.static(uploadsDir));
app.use("/data", express.static(dataDir));
app.use("/", formRoutes);
app.get('/', (req:Request, res:Response) =>{
    res.send('Bem Vindo')
})
app.use('/', dashboardOpRoutes);

app.listen(8080, ()=>{
    console.log('Servidor porta 8080: http://localhost:8080')
})
