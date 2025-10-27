import React from 'react';
import { HighlightCardProps } from '../../types/cardType';

const variantStyles = { // determina cores do card para cada estilo
    primary: {
        bg: 'bg-white',
        text: 'text-black',
        value: 'text-azul-principal',
        icon: 'text-azul-principal',
        hover: 'hover:bg-blue-200',
        shadow: 'shadow-blue-200',
    },
    success: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        value: 'text-green-900',
        icon: 'text-green-600',
        hover: 'hover:bg-green-200',
        shadow: 'shadow-green-200',
    },
    danger: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        value: 'text-red-900',
        icon: 'text-red-600',
        hover: 'hover:bg-red-200',
        shadow: 'shadow-red-200',
    },
    warning: {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        value: 'text-amber-900',
        icon: 'text-amber-600',
        hover: 'hover:bg-amber-200',
    },
    info: {
        bg: 'bg-sky-100',
        text: 'text-sky-800',
        value: 'text-sky-900',
        icon: 'text-sky-600',
        hover: 'hover:bg-sky-200',
    },
    secondary: {
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        value: 'text-slate-900',
        icon: 'text-slate-500',
        hover: 'hover:bg-slate-200',
    },
};

const HighlightCard: React.FC<HighlightCardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    variant = 'primary',
    onClick,
}) => {
    const isClickable = !!onClick;

    // Obtém as classes de estilo para a variação atual
    const styles = variantStyles[variant] || variantStyles.primary;

    // Classes base e dinâmicas
    const baseClasses = `relative p-6 rounded-xl min-w-64 m-2 shadow-lg transition-all duration-200 flex flex-col ${styles.bg}`;

    const clickableClasses = isClickable
        ? `cursor-pointer transform hover:-translate-y-1 ${styles.hover} shadow-md hover:shadow-xl`
        : '';

    const CardContent = (
        <>
            {/* Header: Título e Ícone */}
            <div className="flex justify-between items-start mb-4 w-[99%]">
                <h3 className={`text-sm font-medium ${styles.text} uppercase`}>
                    {title}
                </h3>
                <div className={`absolute top-4 right-4 text-3xl ${styles.icon}`}>
                <Icon /> 
                </div>
            </div>

            {/* Body: Valor de Destaque */}
            <div className="flex-grow">
                <span className={`text-4xl font-bold ${styles.value}`}>
                    {value}
                </span>
            </div>

            {/* Footer: Subtítulo/Métrica */}
            {subtitle && (
                <div className="mt-4 pt-3 border-t border-opacity-30 border-gray-400">
                    <p className={`text-xs ${styles.text}`}>
                        {subtitle}
                    </p>
                </div>
            )}
        </>
    );

    // Se for clicável, usa o elemento <button> para melhor acessibilidade
    if (isClickable) {
        // Usamos 'group' para poder aplicar classes de hover aninhadas se necessário
        return (
            <button
                className={`${baseClasses} ${clickableClasses} text-left`}
                onClick={onClick}
                aria-label={`Detalhes de ${title}`}
            >
                {CardContent}
            </button>
        );
    }

    // Se não for clicável, usa o elemento <div>
    return (
        <div className={`${baseClasses} ${clickableClasses}`}>
            {CardContent}
        </div>
    );
};

export default HighlightCard;