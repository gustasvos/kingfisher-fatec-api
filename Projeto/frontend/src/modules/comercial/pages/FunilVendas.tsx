import React, { useCallback, useEffect, useState } from 'react'
import { LeadProps } from '../../../types/LeadProps'
import LeadCard from '../components/LeadCard'
import Navbar from '../../../shared/components/navbar'
import instance from '../../../services/api'

// FILTRO
const FilterIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

// CATEGORIAS DO FUNIL
const CATEGORIAS = [
  'Prospect',
  'Inicial',
  'Potencial',
  'Manutenção',
  'Em Negociação',
  'Follow Up',
]

// Componente da Coluna do Funil
interface FunilColumnProps {
  title: string
  leads: LeadProps[]
  onLeadDrop: (leadId: string, novaCategoria: string) => void
  selectedLeadId: number | null
  onSelectLead: (id: number) => void
}

const FunilColumn: React.FC<FunilColumnProps> = ({ title, leads, onLeadDrop, selectedLeadId, onSelectLead }) => {

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const leadId = e.dataTransfer.getData('leadId')
    e.currentTarget.classList.remove('bg-blue-50', 'border', 'border-2', 'border-blue-300')
    onLeadDrop(leadId, title)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-blue-50', 'border', 'border-2', 'border-blue-300')
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-blue-50', 'border', 'border-2', 'border-blue-300')
  }



  return (
    (
      <div className="w-full lg:w-1/6 flex-shrink-0 p-2">
        <div
          className="
            bg-slate-50 
            rounded-xl 
            border
            border-slate-200
            h-full
            p-3
            flex 
            flex-col
            overflow-x-hidden 
            transition-all
            duration-50
            "
          onDrop={(handleDrop)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {leads.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {leads.length > 0 ? (
              leads.map((lead) => 
              <LeadCard 
                  key={lead.id} 
                  lead={lead}
                  isSelected={lead.id === selectedLeadId}
                  onSelect={onSelectLead}
                   />)
            ) : (
              <div className="text-center text-xs text-gray-400 mt-4">
                Nenhum lead aqui.
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )
}


// Componente Principal da Tela
const FunilVendas: React.FC = () => {
  const [leads, setLeads] = useState<LeadProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null)

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await instance.get<LeadProps[]>('/cliente/list')
        const leadsComCategoria = response.data.map(lead => ({
          ...lead,
          categoria: lead.Categoria || 'null',
        }))

        setLeads(leadsComCategoria)
      } catch (err) {
        console.error("Erro ao buscar clientes:", err)
        setError("Não foi possível carregar os leads.")
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [])

  const handleLeadDrop = (leadId: string, novaCategoria: string) => {
    instance.patch(`/cliente/${leadId}/categoria`, { categoria: novaCategoria })
      .then(response => {
        setLeads(prevLeads =>
          prevLeads.map(lead =>
            lead.id === parseInt(leadId)
              ? { ...lead, Categoria: novaCategoria }
              : lead
          )
        )
      })
      .catch(err => {
        console.error("Erro ao mover o lead", err)
      })
  }

  const handleSelectLead = (id: number) => {
    setSelectedLeadId(prevSelectedId => {
      return prevSelectedId === id ? null : id
    })
  }

  const getLeadsByCategoria = (categoria: string) => {
    return leads.filter((lead) => lead.Categoria === categoria)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center text-gray-500 py-10">
          Carregando leads...
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center text-red-500 py-10">
          {error}
        </div>
      )
    }

    return (
      <div className="
        flex 
        flex-col 
        lg:flex-row 
        w-full 
        overflow-x-hidden
        pb-4
        ">
        {CATEGORIAS.map((categoria) => (
          <FunilColumn
            key={categoria}
            title={categoria}
            leads={getLeadsByCategoria(categoria)}
            onLeadDrop={handleLeadDrop}
            selectedLeadId={selectedLeadId}
            onSelectLead={handleSelectLead}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Funil de Vendas</h1>
            <button className="
              flex 
              items-center 
              gap-2 
              px-4 
              py-2 
              bg-white 
              border 
              border-gray-300 
              rounded-lg 
              text-sm 
              font-medium 
              text-gray-700 
              hover:bg-gray-50
              hover:shadow-sm
              transition
              ">
              <FilterIcon />
              Filtros
            </button>
          </header>
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default FunilVendas