import React from "react"

type ModalProps = {
    aberto: boolean
    onFechar: () => void
    children: React.ReactNode // conteudo do modal
}

const Modal: React.FC<ModalProps> = ({ aberto, onFechar, children }) => {
    if (!aberto) return null

    const handleClickOutside = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onFechar()
        }
    }

    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClickOutside}>
            <section className="p-6 w-[30vw] max-w-full max-h-auto overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {children}
            </section>
        </section>
    );
};

export default Modal
