import { useEffect, useRef } from 'react'

const Modal = ({
    isOpen,
    onClose,
    onSubmitModal,
    children,
    title,
    DivClass,
    btn1Class,
    btn1Text,
    btn2Class,
    btn2Text,
    disabled,
    btnControl,
}) => {
    const modalRef = useRef(null)

    // Faz com que o foco do teclado fique dentro do modal
    const handleTabKey = (e) => {
        if (e.key === 'Escape') {
            onClose()
        }
        if (e.key === 'Tab') {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey && e.target === firstElement) {
                e.preventDefault()
                lastElement.focus()
            } else if (!e.shiftKey && e.target === lastElement) {
                e.preventDefault()
                firstElement.focus()
            }
        }
    }

    // Não deixa o scroll da pagina acontecer quando o modal estiver aberto
    useEffect(() => {
        if (isOpen) {
            modalRef.current.focus()
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
    }, [isOpen])

    return (
        <>
            {/* Overlay do modal */}
            {isOpen && <div className="overlay"></div>}
            {/* Modal */}
            {isOpen && (
                <div
                    ref={modalRef}
                    className="fixed z-50 inset-0 overflow-y-auto"
                    aria-modal="true"
                    tabIndex="-1"
                    role="dialog"
                    onKeyDown={handleTabKey}
                >
                    <div
                        className="flex items-center justify-center min-h-screen relative "
                        style={{ zIndex: '501' }}
                    >
                        <div className="bg-hover rounded-lg w-11/12 md:w-[500px] relative ">
                            {/* Cabeçalho do modal */}
                            <div className="px-4 pt-2 pb-1 bg-primary rounded-t-lg ">
                                <div className="flex items-center justify-between mb-4 ">
                                    <h2 className="text-primary text-xl font-bold">
                                        {title}
                                    </h2>
                                    <button onClick={onClose}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-secondary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                {/* Conteudo do modal */}
                                {children}
                                {/* Botões de ação do modal */}
                                {btnControl && (
                                    <div className={DivClass}>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className={btn1Class}
                                        >
                                            {btn1Text}
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={onSubmitModal}
                                            className={btn2Class}
                                            disabled={disabled}
                                        >
                                            {btn2Text}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
