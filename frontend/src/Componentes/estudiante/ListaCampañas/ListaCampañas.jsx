import React from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';

const CampaignList = () => {
  // Dummy data for campaigns
  const campaigns = [
    { id: 1, name: 'Campaña de Orientación', description: 'Orientación a estudiantes nuevos' },
    { id: 2, name: 'Campaña de Biblioteca', description: 'Asistencia en la biblioteca escolar' },
    { id: 3, name: 'Campaña de Comedor', description: 'Ayuda en el servicio del comedor escolar' },
    { id: 4, name: 'Campaña de Enfermería', description: 'Apoyo en la enfermería del colegio' },
    // Add more campaigns as needed
  ];

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Campañas
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card elevation={3}>
              <div style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  {campaign.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {campaign.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Ver Detalles
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CampaignList;
