import React from "react";
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

const AdminMenu = ({ children }) => {
  const menuItems = [
    { text: "Inicio", path: "/" },
    { text: "Campañas", path: "/campanas" },
    { text: "Certificados", path: "/certificados" },
    { text: "Notificaciones", path: "/notificaciones" },
    { text: "Docentes", path: "/docentes" },
    { text: "Estudiantes", path: "/estudiantes" },
    { text: "Perfil", path: "/perfil" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Panel Orientador
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminMenu;
