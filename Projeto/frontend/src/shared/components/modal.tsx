import React from "react"
import { createPortal } from "react-dom";

type ModalProps = {
    aberto: boolean
    onFechar: () => void
    children: React.ReactNode // conteudo do modal
    modalClassName?: string
}

const Modal: React.FC<ModalProps> = ({ aberto, onFechar, children, modalClassName }) => {
    if (!aberto) return null

    const handleClickOutside = (e: React.MouseEvent) => {
        console.log('clicou fora?', e.target === e.currentTarget)
        if (e.target === e.currentTarget) {
            onFechar()
        }
    }

    const modalRoot = document.getElementById('modal-root')
    if (!modalRoot) return null

    return createPortal(
        <section
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] overflow-y-auto ${modalClassName}`}
            onClick={handleClickOutside}>
            {children}
            {/* <section className={`p-6 w-[30vw] h-[40vh] max-w-full max-h-auto ${modalClassName}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </section> */}
        </section>,
        modalRoot
    )
};

export default Modal
