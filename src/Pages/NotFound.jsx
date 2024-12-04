
import { Box, Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary w-screen">
      <Box className="text-center space-y-6 p-8 bg-background rounded-lg shadow-lg">
        <Box className="relative">
          <Box className="text-9xl font-bold text-primary opacity-20">404</Box>
          <Box className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-primary">Página no encontrada</h1>
          </Box>
        </Box>
        <p className="text-muted-foreground max-w-md mx-auto">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que haya sido movida o eliminada.
        </p>
        <Box className="w-16 h-1 bg-primary mx-auto my-4"></Box>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" variant="contained" color="primary"  >
          <Link to="/" className="flex items-center text-white hover:text-white">
            <ArrowBackIcon className="mr-2 h-4 w-4 text-white" /> Volver al inicio
          </Link>
        </Button>
      </Box>
    </Box>
  )
}