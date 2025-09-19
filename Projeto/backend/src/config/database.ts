import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../modules/models/usuario'
import { Motorista } from '../modules/models/motorista'
//dotenv permite ler variáveis do .env
import * as dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    synchronize: true,
    logging: true,
    entities: [User, Motorista],
    subscribers: [],
    migrations: [__dirname + './migration/*.js'],
})

AppDataSource.initialize()
    .then(()  => {
        console.log('Conexão Realizada com Sucesso!')
    }).catch((error) => {
        console.log('Erro na conexão com o banco de dados:', error)
    })