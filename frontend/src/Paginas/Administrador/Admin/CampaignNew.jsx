import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const CampaignNew = () => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log("Nueva campaña agregada:", name);
    setName("");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Agregar Nueva Campaña
      </Typography>
      <TextField
        label="Nombre de la Campaña"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Guardar
      </Button>
    </Box>
  );
};

export default CampaignNew;
