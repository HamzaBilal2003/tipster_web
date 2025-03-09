import React from 'react'

const BtnLoader = () => {
    return (
        <div className='flex justify-center items-center py-2'>
            <div className="flex flex-row gap-2">
                <div className="w-1 h-1 rounded-full bg-black animate-bounce"></div>
                <div className="w-1 h-1 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-1 h-1 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    )
}

export default BtnLoader