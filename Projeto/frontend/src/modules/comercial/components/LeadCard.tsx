import React from 'react'
import { LeadProps } from '../../../types/LeadProps'

interface LeadCardProps {
  lead: LeadProps
  isSelected: boolean
  onSelect: (id: number) => void
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isSelected, onSelect }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add(
      'shadow-xl',
      'rotate-2',
      'opacity-80',
      'scale-105',
      'border-blue-500'
    )
    e.dataTransfer.setData('leadId', String(lead.id))
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(
      'shadow-xl', 
      'rotate-2', 
      'opacity-80', 
      'scale-105',
      'border-blue-500'
    )
  }

  const handleClick = () => {
    onSelect(lead.id)
  }

  return (
   <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick} 
      className={`
        bg-white 
        p-4 
        rounded-lg 
        shadow-sm
        mb-3 
        cursor-pointer         
        border 
        hover:shadow-md
        transition-all 
        duration-200 
        ease-in-out
        ${isSelected 
          ? 'shadow-lg border-blue-500 rotate-0.1' 
          : 'border-gray-200'                                
        }
      `}
    >
      <h4 className="font-semibold text-sm text-gray-900">
        {lead.nomeFantasia}
      </h4>
      <p className="text-xs text-gray-500 mt-1">
        {lead.contatoResponsavel}
      </p>
    </div>
  )
}

export default LeadCard