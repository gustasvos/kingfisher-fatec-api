import PDFDocument = require("pdfkit");
import fs from "fs";

// Gera o PDF legível para o usuário
export const gerarPDF = (data: any, cliente: any, pdfPath: string) => {
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(pdfPath));

    const addSection = (title: string, content: string | string[]) => {
        doc
            .fillColor("#135b78")
            .fontSize(14)
            .text(title, { underline: true })
            .moveDown(0.2)
            .fillColor("#333")
            .fontSize(12)
            .text(Array.isArray(content) ? content.join("\n") : content)
            .moveDown(1);
    };

    // Cabeçalho
    doc
        .fontSize(20)
        .fillColor("#135b78")
        .text("Cotação Registrada", { align: "center" })
        .moveDown(1);

    doc
        .fontSize(12)
        .fillColor("#333")
        .text("Uma nova cotação foi registrada. Seguem os principais dados:", { align: "center" })
        .moveDown(1);

    // Valor Total
    addSection("Valor Total", `R$ ${parseFloat(data.valor_total).toFixed(2)}`);

    // Cliente
    addSection("Cliente", [
        `Nome Fantasia: ${cliente.nomeFantasia}`,
        `CNPJ: ${cliente.CNPJ}`,
        `Responsável: ${cliente.contatoResponsavel} (${cliente.emailResponsavel})`,
    ]);

    // Datas
    const dataCriacao = new Date(data.data_criacao).toLocaleDateString();
    addSection("Datas", [
        `Criação: ${dataCriacao}`,
        `Validade: ${data.data_validade}`,
    ]);

    // Detalhes do frete
    let detalhesFrete: any = {};
    try { detalhesFrete = JSON.parse(data.detalhes_frete); } catch {}
    addSection("Detalhes do Frete", [
        `Mercadoria: ${detalhesFrete.mercadoria || "-"}`,
        `Local de Coleta: ${detalhesFrete.localColeta || "-"}`,
        `Local de Entrega: ${detalhesFrete.localEntrega || "-"}`,
        `Peso Estimado: ${detalhesFrete.pesoEstimado || "-"}`,
        `Tipo de Veículo: ${detalhesFrete.tipoVeiculo || "-"}`
    ]);

    // Rodapé
    doc
        .fontSize(10)
        .fillColor("#777")
        .text("2025 Newe Logistica Integrada", { align: "center" });

    doc.end();
};
