import React from 'react'

const MenuOptionsCard = ({ Delete, update, view }) => {
    return (
        <>
            <div className="absolute top-3 right-3 bg-secundary py-1 flex flex-col justify-center items-center rounded-lg z-10">
                <div
                    className="cursor-pointer hover:bg-primary w-full text-center text-sm p-1"
                    onClick={update}
                >
                    Editar
                </div>
                <div
                    className="cursor-pointer hover:bg-primary w-full text-center text-sm p-1"
                    onClick={Delete}
                >
                    Excluir
                </div>
                <div
                    className="cursor-pointer hover:bg-primary w-full text-center text-sm p-1"
                    onClick={view}
                >
                    Visualizar
                </div>
            </div>
        </>
    )
}

export default MenuOptionsCard
