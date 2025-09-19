//Ponto de entrada do backend, (como o main.tsx do front)
import express, {Request, Response} from 'express'
import cors from 'cors'
import UsersController from './modules/controllers/UsersControllers'
import motoristaRouter from './modules/routes/motoristaRouter'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/',UsersController)
app.use('/',motoristaRouter)
app.get('/', (req:Request, res:Response) =>{
    res.send('Bem Vindo')
})

app.listen(8080, ()=>{
    console.log('Servidor porta 8080: http://localhost:8080')
})