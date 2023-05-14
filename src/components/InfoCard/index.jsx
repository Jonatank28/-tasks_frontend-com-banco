import React from 'react'

const InfoCard = ({ title, content }) => {
    return (
        <div className="bg-primary rounded-xl p-4 h-[55px] flex gap-1">
            <h1>{title}:</h1>
            <span>{content}</span>
        </div>
    )
}

export default InfoCard
