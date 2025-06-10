import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Error() {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center p-4 bg-info bg-opacity-10 min-vh-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-3 p-4 w-100 mx-auto text-center"
                style={{ maxWidth: "32rem" }}
            >
                <div className="d-flex justify-content-center mb-3">
                    <div className="bg-info bg-opacity-25 text-info rounded-circle p-3">
                        <AlertTriangle size={70} />
                    </div>
                </div>
                <h1 className="h2 fw-bold text-info mb-2">¡Algo salió mal!</h1>
                <h3 className="h4 fw-bold text-info mb-2">¡NOOOOOOOOOOOOOOOOOO!</h3>
                <p className="text-muted small mb-4">
                    No pudimos completar tu solicitud. Intenta de nuevo o vuelve al inicio.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-info text-dark px-4 py-2 rounded-3"
                    >
                        Recargar
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-info text-dark px-4 py-2 rounded-3"
                    >
                        Ir al inicio
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
