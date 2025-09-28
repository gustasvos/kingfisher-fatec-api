//Ponto de entrada do backend, (como o main.tsx do front)
import express, {Request, Response} from 'express'
import usuariosRoutes from './modules/routers/usuariosRoutes';
import EventoRoutes from './modules/routers/EventoRoutes';
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', // ou '*' para liberar geral (não recomendado em produção)
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true // se você usa cookies, tokens etc
}));

app.use('/',EventoRoutes)
app.use('/',usuariosRoutes)
app.get('/', (req:Request, res:Response) =>{
    res.send('Bem Vindo')
})

app.listen(8080, ()=>{
    console.log('Servidor porta 8080: http://localhost:8080')
})
