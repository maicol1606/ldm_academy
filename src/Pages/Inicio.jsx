import React, { useState } from "react";
import Header from "../Componentes/Header";
import Navbar from "../Componentes/Navbar";
import CardComponent from "../Componentes/Card";
import { Box, Typography } from "@mui/material";
import Tabla from "../Componentes/Tabla";

const Inicio = () => {
  const EncabezadoTablaPrestamos = [
    "ID",
    "NOMBRE",
    "APELLIDO",
    "Marca",
    "Vehiculo",
    "ESTATUS",
  ];

  const PrestamosRecientes = [
    [1, "Oscar", "Osorio", "Ford", "Figo", "A"],
    [2, "Oscar", "Osorio", "MG", "SZ", "A"],
    [3, "Oscar", "Osorio", "INE", 121546, "A"],
  ];

  return (
    <>
      <Box className="sm:flex flex-row items-center justify-center flex-wrap w-screen gap-8">
          <Box className="lg:flex-auto sm:pt-20 pl-10">
            <CardComponent>
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                gutterBottom
              >
                Empeños Activos
              </Typography>
              <Typography component="h1" variant="h4" gutterBottom>
                150
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                Valor Total:
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                $7,500,000 MXN
              </Typography>
            </CardComponent>
          </Box>
          
          <Box className="lg:flex-auto sm:pt-20">
            <CardComponent>
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                gutterBottom
              >
                Empeños Activos
              </Typography>
              <Typography component="h1" variant="h4" gutterBottom>
                150
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                Valor Total:
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                $7,500,000 MXN
              </Typography>
            </CardComponent>
          </Box>

          <Box className="sm:px-3">
            <CardComponent>
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                gutterBottom
              >
                Próximos Vencimientos
              </Typography>
              <Typography component="h1" variant="h6" gutterBottom>
                Ana Martínez
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                Volkswagen Jetta 2016 - Vence: 2023-07-15
              </Typography>
              <Typography component="h1" variant="h6" gutterBottom>
                Pedro Sánchez
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                Ford Focus 2018 - Vence: 2023-07-18
              </Typography>
              <Typography component="h1" variant="h6" gutterBottom>
                Laura Rodríguez
              </Typography>
              <Typography component="p" variant="subtitle1" gutterBottom>
                Chevrolet Cruze 2017 - Vence: 2023-07-20
              </Typography>
            </CardComponent>
          </Box>


        <Box className="sm:ml-10 px-8 pb-8">
          <CardComponent>
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              gutterBottom
            >
              Empeños Recientes
            </Typography>
            <Tabla rowHeader={EncabezadoTablaPrestamos} dataTable={PrestamosRecientes} />
          </CardComponent>
        </Box>

      </Box>
    </>
  );
};

export default Inicio;
