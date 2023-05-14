import React from 'react'

const BtnFilter = () => {
    function handleFilter() {
        console.log('Filtro')
    }

    return (
        <div
            className="flex items-center cursor-pointer px-1 rounded-md fill-current text-indigo-500  hover:bg-indigo-300 hover:text-white transition duration-500 ease-in-out"
            onClick={handleFilter}
        >
            <p className="w6 h-6 ml-2 ">Filtros</p>
            {/* Icone do filtro */}
            <svg
                class="w-6 h-6 ml-2 "
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="FilterListIcon"
            >
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
            </svg>
        </div>
    )
}

export default BtnFilter
