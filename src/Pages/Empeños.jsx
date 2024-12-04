import { Box } from '@mui/material'
import React from 'react'
import Tabla from '../Componentes/Tabla'
import CardComponent from '../Componentes/Card';
import BottonForm from '../Componentes/BottonForm';
import { Link } from 'react-router-dom';

const Empeños = () => {

  const rowHeader = [
    "ID",
    "NOMBRE",
    "APELLIDO",
    "Marca",
    "Vehiculo",
    "ESTATUS"
  ];

  const dataTable = [
    [1,"Oscar","Osorio","Ford","Figo","A"],
    [2,"Oscar","Osorio","MG","SZ","A"],
    [3,"Oscar","Osorio","INE",121546,"A"]
  ]


  return (
    <Box className="flex flex-col items-center  gap-4 grow self-center w-screen">
      <CardComponent>
        <Link to={"/AgregarPrestamo"}>
          <BottonForm descripcion="Agregar Prestamo" fullsize={false} />
        </Link>
        <Tabla rowHeader = {rowHeader} dataTable= {dataTable} />
      </CardComponent>
    </Box>
  )
}

export default Empeños