import React from 'react';
import { Button, Typography, Container } from '@mui/material';

const CampaignInfo = () => {
  // Dummy data for a selected campaign
  const campaign = {
    name: 'Campaña de Orientación',
    description: 'Esta campaña está orientada a ayudar a los estudiantes nuevos a adaptarse al colegio.',
    objectives: 'Asegurar que los estudiantes nuevos reciban la orientación necesaria para tener un buen comienzo en su vida escolar.',
    duration: 'Desde el inicio del semestre hasta el final del semestre.',
    // Add more details as needed
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Información de la Campaña: {campaign.name}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Descripción
      </Typography>
      <Typography variant="body1" paragraph>
        {campaign.description}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Objetivos
      </Typography>
      <Typography variant="body1" paragraph>
        {campaign.objectives}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Duración
      </Typography>
      <Typography variant="body1" paragraph>
        {campaign.duration}
      </Typography>

      <Button variant="contained" color="primary" fullWidth>
        Postúlate Ahora
      </Button>
    </Container>
  );
};

export default CampaignInfo;
