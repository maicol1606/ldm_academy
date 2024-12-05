import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const CampaignList = () => {
  const campaigns = [
    { id: 1, name: "Coordinación", status: "Activa" },
    { id: 2, name: "Orientación", status: "Activa" },
    { id: 3, name: "Comedor", status: "Inactiva" },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Campañas
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
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

export default CampaignList;
