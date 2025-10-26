import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../modules/models/usuario'
//dotenv permite ler variáveis do .env
import * as dotenv from "dotenv"
import { EventoConvidado } from '../modules/models/EventoConvidado'
import { Evento } from '../modules/models/Evento'
import { EventoResposta } from '../modules/models/eventoResposta'
import { UsuarioLocal } from '../modules/models/UsuarioLocal'
import { Cliente } from '../modules/models/cliente'
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
    entities: [User, Evento, EventoConvidado, EventoResposta, UsuarioLocal, Cliente],
    subscribers: [],
    migrations: [__dirname + './migration/*.js'],
})

AppDataSource.initialize()
    .then(()  => {
        console.log('Conexão Realizada com Sucesso!')
    }).catch((error) => {
        console.log('Erro na conexão com o banco de dados:', error)
    })
