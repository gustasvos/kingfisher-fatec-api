import express from 'express'
import {
    createMotorista,
    getMotoristas,
    getMotoristaById,
    updateMotorista,
    deleteMotorista
} from '../controllers/UserMotorista'

const router = express.Router()

router.post('/motorista', createMotorista)
router.get('/motorista', getMotoristas)
router.get('/motorista/:id', getMotoristaById)
router.put('/motorista/:id', updateMotorista)
router.delete('/motorista/:id', deleteMotorista)

export default router