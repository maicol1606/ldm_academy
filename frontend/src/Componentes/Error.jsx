import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Error() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center p-6 bg-blue-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center border border-blue-300"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-blue-200 text-blue-600 rounded-full p-3 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-blue-700 mb-1">¡Algo salió mal!</h1>
        <h3 className="text-xl font-bold text-blue-700 mb-1">¡NOOOOOOOOOOOOOOOOOO!</h3>    <p className="text-sm text-gray-600 mb-4">
          No pudimos completar tu solicitud. Intenta de nuevo o vuelve al inicio.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-black px-4 py-2 rounded-lg text-sm hover:bg-blue transition"
          >
            Recargar
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-black px-4 py-2 rounded-lg text-sm hover:bg-blue transition"
          >
            Ir al inicio
          </button>
        </div>
      </motion.div>
    </div>
  )
}

