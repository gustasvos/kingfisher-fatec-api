import { Request, Response } from "express"
import { AppDataSource } from "../../config/database"
import { Cotacao } from "../models/cotacao"
import { Cliente } from "../models/cliente"
import { DeepPartial } from "typeorm";
import nodemailer from "nodemailer"
import fs from "fs";
import path from "path";
import dotenv from 'dotenv'
import PDFDocument from "pdfkit"; // biblioteca para gerar PDFs
import { cotacoesDir } from "../../config/paths";

dotenv.config()

export const createCotacao = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const clienteRepository = AppDataSource.getRepository(Cliente);
        const cotacaoRepository = AppDataSource.getRepository(Cotacao);

        // 1️⃣ Verifica se o cliente existe
        const cliente = await clienteRepository.findOneBy({ id: data.id_cliente });
        if (!cliente) {
            return res.status(400).json({ message: "Cliente não encontrado!" });
        }

        // 2️⃣ Cria a cotação no banco (sem caminho de PDF ainda)
        const novaCotacao: Cotacao = cotacaoRepository.create({ ...data } as DeepPartial<Cotacao>);
        await cotacaoRepository.save(novaCotacao);


        // 3️⃣ Cria pasta do PDF: /uploads/cotacoes/ANO/MES
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const folderPath = path.join(cotacoesDir, `${year}`, `${month}`);
        fs.mkdirSync(folderPath, { recursive: true });

        // 4️⃣ Gera o PDF
        const pdfFileName = `cotacao_${novaCotacao.id}.pdf`;
        const pdfPath = path.join(folderPath, pdfFileName);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(20).text("Cotação", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Cliente: ${cliente.nomeFantasia}`);
        doc.text(`Data Validade: ${data.data_validade}`);
        doc.text(`Status: ${data.status}`);
        doc.text(`Valor Total: R$ ${data.valor_total.toFixed(2)}`);
        doc.text(`Detalhes Frete: ${data.detalhes_frete}`);
        doc.end();

        // 5️⃣ Atualiza o caminho do PDF no banco (relativo)
        const relativePdfPath = `/uploads/cotacoes/${year}/${month}/${pdfFileName}`;
        novaCotacao.caminho_arquivo_pdf = relativePdfPath;
        await cotacaoRepository.save(novaCotacao);

        return res.status(201).json({
            message: "Cotação criada e PDF gerado com sucesso!",
            cotacao: novaCotacao
        });

    } catch (error) {
        console.error("Erro ao criar cotação:", error);
        return res.status(500).json({
            message: "Erro ao criar cotação!",
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const listCotacoes = async (req: Request, res: Response) => {
    try {
        const cotacaoRepository = AppDataSource.getRepository(Cotacao)
        const cotacoes = await cotacaoRepository.find({
            relations: ["cliente"]
        })

        return res.status(200).json(cotacoes)

    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar cotações!" })
    }
}

export const listCotacaoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const cotacaoRepository = AppDataSource.getRepository(Cotacao)
        const cotacao = await cotacaoRepository.findOne({
            where: { id: parseInt(id!) },
            relations: ["cliente"]
        })

        if (!cotacao) {
            return res.status(404).json({
                message: "Cotação não encontrada!"
            })
        }

        return res.status(200).json(cotacao)

    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar cotação!" })
    }
}

export const updateCotacao = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body

        const cotacaoRepository = AppDataSource.getRepository(Cotacao)
        const cotacao = await cotacaoRepository.findOneBy({ id: parseInt(id!) })

        if (!cotacao) {
            return res.status(404).json({ message: "Cotação não encontrada!" })
        }

        cotacaoRepository.merge(cotacao, data)
        const updated = await cotacaoRepository.save(cotacao)

        return res.status(200).json({
            message: "Cotação atualizada com sucesso!",
            cotacao: updated
        })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar cotação!", error })
    }
}

export const deleteCotacao = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const cotacaoRepository = AppDataSource.getRepository(Cotacao)
        const cotacao = await cotacaoRepository.findOneBy({ id: parseInt(id!) })

        if (!cotacao) {
            return res.status(404).json({ message: "Cotação não encontrada!" })
        }

        await cotacaoRepository.remove(cotacao)

        return res.status(200).json({ message: "Cotação removida com sucesso!" })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao remover cotação!" })
    }
}

// POST /cotacao/enviar-email
export const enviarEmailCotacao = async (req: Request, res: Response) => {
    try {
        const { cotacaoId, template } = req.body

        if (!cotacaoId || !template) {
            return res.status(400).json({ message: "cotacaoId ou template vazio." })
        }

        const cotacaoRepository = AppDataSource.getRepository(Cotacao)

        const cotacao = await cotacaoRepository.findOne({
            where: { id: cotacaoId },
            relations: ["cliente"]
        });

        if (!cotacao) {
            return res.status(404).json({ message: "Cotação não encontrada." })
        }

        // substitui variáveis no template
        let htmlFinal = template
            .replace(/{{valor_total}}/g, cotacao.valor_total.toFixed(2))
            .replace(/{{nomeFantasia}}/g, cotacao.cliente.nomeFantasia)
            .replace(/{{CNPJ}}/g, cotacao.cliente.CNPJ || "")
            .replace(/{{contatoResponsavel}}/g, cotacao.cliente.contatoResponsavel || "")
            .replace(/{{emailResponsavel}}/g, cotacao.cliente.emailResponsavel || "")
            .replace(/{{data_criacao}}/g, cotacao.data_criacao.toISOString().slice(0, 10))
            .replace(/{{data_validade}}/g, cotacao.data_validade.toISOString().slice(0, 10))
            .replace(/{{detalhes_frete}}/g, cotacao.detalhes_frete || "")
            .replace(/{{caminho_arquivo_pdf}}/g, cotacao.caminho_arquivo_pdf || "")

        // configura o transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: `"Newe Logística" <${process.env.GMAIL_USER}>`,
            to: process.env.EMAIL_RECEIVER,
            subject: `Nova Cotação — Cliente ${cotacao.cliente.nomeFantasia}`,
            html: htmlFinal
        }).catch(e => {
            console.error("ERRO DO NODEMAILER: ", e)
            throw e
        })

        return res.status(200).json({ message: "E-mail enviado com sucesso!" })

    } catch (error) {
        console.error("Erro ao enviar e-mail:", error)
        // console.log("USER:", process.env.GMAIL_USER);
        // console.log("PASS:", process.env.GMAIL_APP_PASSWORD);
        return res.status(500).json({ message: "Erro ao enviar e-mail." })

    }
}
