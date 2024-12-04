import { SvgIcon, Typography } from '@mui/material'
import React from 'react'

const Opcion = ({descripcion = "Opcion", icono = <></>, navegacion}) => {
  
  return (
    <>
        <div className='flex gap-2 text-white font-sans hover:bg-slate-700 cursor-pointer p-2' onClick={navegacion}>
            <SvgIcon component={icono} inheritViewBox />
            <p>{descripcion}</p>
        </div>
    </>
  )
}

export default Opcion