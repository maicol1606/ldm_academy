import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material'; // Usamos Material-UI para los componentes

const Home = () => {
  return (
    <div>
      {/* Título principal */}
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenido al Servicio Social
      </Typography>
      
      {/* Descripción de la plataforma */}
      <Typography variant="h5" align="center" paragraph>
        Descubre las campañas disponibles y postúlate para participar.
      </Typography>
      
      {/* Información sobre las campañas */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <div style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                ¿Por qué postularse?
              </Typography>
              <Typography variant="body1" paragraph>
                Participar en las campañas de servicio social es una oportunidad para aportar a la comunidad mientras completas tus horas de servicio social.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Ver Campañas Disponibles
              </Button>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <div style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Campañas Disponibles
              </Typography>
              <Typography variant="body1" paragraph>
                Aquí puedes ver las campañas disponibles en las que puedes participar.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Ver Detalles
              </Button>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <div style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                ¿Cómo Funciona?
              </Typography>
              <Typography variant="body1" paragraph>
                Consulta información sobre cada campaña y postúlate para completar tus horas de servicio social.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Más Información
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
