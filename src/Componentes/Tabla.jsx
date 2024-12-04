import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'

const Tabla = (props) => {

  const { dataTable } = props;

  const [page, setPage] = useState(1);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {props.rowHeader.map((header) => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((data, index) =>(
              <TableRow key={index}>
              {Object.entries(data).map(([key,value]) =>(
                  <TableCell key={key}>
                    {typeof value === 'object'
                    ? JSON.stringify(value) // Convierte objetos o arreglos en string
                    : value.toString()}
                  </TableCell>
              ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="flex flex-row-reverse  mt-5">
        <Pagination count={10} variant="outlined" color="primary" />
      </Box>
    </Box>
  )
}

export default Tabla