import express, { Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { User } from '../models/usuario'
import { Not } from 'typeorm'
import { console } from 'inspector'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/user',async (req: Request, res: Response) => {
    try{
        var data = req.body

        const userRepository = AppDataSource.getRepository(User)

        const existingUser = await userRepository.findOne({
            where: {
                cpf: data.cpf,
                email: data.email
            }
        })
        if(existingUser){
            res.status(400).json({
                message:'Já existe usuário cadastrado com esse email!'
            })
        return
        }
        const saltRounds = 10

        const senha = data.senha
        const hash = await bcrypt.hash(senha, saltRounds)
        data.senha = hash //inserindo a hash

        const newUser = userRepository.create(data) 
        await userRepository.save(newUser)
        console.log(newUser)

        res.status(201).json({
            message:'Usuário cadastrado com sucesso!',
            user: newUser
        })
        
    }catch(error){ res.status(500).json({
        message:'Erro ao cadastrar o usuário!',
        error: error
    })}
})
// Comparar senha fornecida com hash armazenado
// const senhaValida = await bcrypt.compare('minhaSenhaSegura', hash);




// ENDPOINT LOGIN

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { email: email }
        });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({
                message: 'Email ou senha inválidos.'
            });
        }

        // Compara a senha com a hash salva
        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({
                message: 'Email ou senha inválidos.'
            });
        }

        // Login bem-sucedido
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                cpf: user.cpf
                // Não inclua a senha no retorno!
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({
            message: 'Erro interno ao tentar realizar o login.',
            error: error
        });
    }
});


export default router