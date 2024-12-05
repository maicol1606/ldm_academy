import React, { useState } from "react";
import { Box, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const CampaignSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const campaigns = [
    { id: 1, name: "Coordinación", status: "Activa" },
    { id: 2, name: "Orientación", status: "Activa" },
    { id: 3, name: "Comedor", status: "Inactiva" },
  ];

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Buscar Campañas
      </Typography>
      <TextField
        label="Buscar por Nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.id}</TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CampaignSearch;
