// meu-projeto/backend/src/modules/dashboard/dashboard.routes.ts
import { Router, Request, Response } from 'express';
import { processCsvData } from '../../utils/csvProcessor';
import { DashboardData } from '../../types/dashboardOp';

const dashboardRouter = Router();

// Rota principal do dashboard operacional
dashboardRouter.get('/dashboard-op', async (req: Request, res: Response) => {
  try {
    const data: DashboardData = await processCsvData();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar ou processar dados do dashboard:', error);
    res.status(500).json({ message: 'Erro ao carregar dados do dashboard.' });
  }
});

// Exemplo de rota de usuário (simulação)
dashboardRouter.get('/user/me', (req: Request, res: Response) => {
    // essa lógica viria de um serviço de autenticação
    res.json({
        avatarUrl: '../../../../assets/usuario.svg', 
        name: 'Administrador OP',
        role: 'Operações Admin',
        email: 'admin.op@newe.com',
    });
});

export default dashboardRouter;