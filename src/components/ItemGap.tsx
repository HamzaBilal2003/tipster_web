import React from 'react'

type props = {
  children: React.ReactNode
}

const ItemGap = ({ children }: props) => {
  return (
    <div className='flex items-center gap-4'>
      {children}
    </div>
  )
}

export default ItemGap