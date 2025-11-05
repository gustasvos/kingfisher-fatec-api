import React from 'react'
import { LeadProps } from '../../../types/LeadProps'

interface LeadCardProps {
  lead: LeadProps
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  return (
    <div
      draggable="true" 
      className="
        bg-white 
        p-4 
        rounded-lg 
        shadow 
        mb-3 
        cursor-grab 
        active:cursor-grabbing 
        border 
        border-gray-200 
        hover:shadow-md 
        transition-shadow 
        duration-200
      "
      
      onDragStart={(e) => {
        e.currentTarget.classList.add('opacity-50', 'shadow-xl')
        e.dataTransfer.setData('leadId', lead.id)
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove('opacity-50', 'shadow-xl')
      }}
    >
      <h4 className="font-bold text-sm text-gray-800">{lead.NomeFantasia}</h4>
      <p className="text-xs text-gray-600 mt-1">{lead.ContatoResponsavel}</p>
    </div>
  )
}

export default LeadCard