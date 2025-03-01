import React from 'react'

type props = {
  children: React.ReactNode
}

const TableFiltersCan = ({ children }: props) => {
  return (
    <div className='flex md:items-center justify-between gap-4 flex-col md:flex-row'>
      {children}
    </div>
  )
}

export default TableFiltersCan