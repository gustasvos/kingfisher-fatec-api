export interface HighlightCardProps {
    title: string;
    value: string | number;
    subtitle?: string; /** Texto ou métrica adicional, por ex: "Últimos 30 dias". */
    icon?: React.ReactNode;  /** Ícone para representar o card (pode ser um componente React ou um string/enum se estiver usando uma biblioteca de ícones). */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'; /** Cor de destaque ou variação do card. */
    onClick?: () => void; /** Opcional: URL ou função para o evento de clique, se o card for clicável. */
  }