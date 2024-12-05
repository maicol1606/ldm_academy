import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const AdminHome = () => {
  const resumen = [
    { title: "Campañas Activas", value: 6 },
    { title: "Estudiantes Registrados", value: 120 },
    { title: "Docentes Registrados", value: 10 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido, Orientador
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aquí puedes gestionar las campañas, docentes y estudiantes.
      </Typography>
      <Grid container spacing={3}>
        {resumen.map((item) => (
          <Grid item xs={12} sm={4} key={item.title}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome;
