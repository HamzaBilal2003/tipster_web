import React from 'react'

const Loarder = () => {
    return (
       <div className='flex items-center justify-center w-full h-[60vh]'>
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
            </div>
       </div>
    )
}

export default Loarder