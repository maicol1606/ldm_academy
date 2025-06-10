import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_PUBLIC_API_DOMAIN;

// Convertir useQuery en una función regular
const queryApi = async (endpoint, options, showSuccessMessage = false) => {
    try {
        const response = await fetch(`${API_URL}/api${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            ...options,
        });
        const result = await response.json();

        if (result.success && showSuccessMessage) {
            Swal.fire({
                icon: "success",
                title: "Acción exitosa",
                text: result.message,
                background: "#faf5ff",
                color: "#3b0764",
            });
        } else if (!result.success && showSuccessMessage) {
            Swal.fire({
                icon: "error",
                title: "Acción fallida",
                text: result.message,
                background: "#faf5ff",
                color: "#3b0764",
            });
        }

        return result;
    } catch (error) {
        console.error("Error al realizar la petición: ", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error en la petición: " + error.message,
        });
        return undefined;
    }
};

// Hooks personalizados para las llamadas a la API
export const useGetData = (endpoint, showSuccessMessage = false) => {
    const [data, setData] = useState(null);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const result = await queryApi(endpoint, {
                method: "GET",
            }, showSuccessMessage);
            if (result) {
                setData(result.data);
                setCount(result?.count || 0);
            }
            setLoading(false);
        };
        fetchData();
    }, [endpoint, trigger, location, showSuccessMessage]);

    const reload = () => setTrigger((prev) => prev + 1);

    return { data, loading, reload, count };
};

export const usePutData = async (endpoint, data) => {
    return await queryApi(endpoint, { method: "PUT", body: JSON.stringify(data) }, true);
};

export const usePostData = async (endpoint, data) => {
    return await queryApi(endpoint, { method: "POST", body: JSON.stringify(data) }, true);
};

export const useDeleteData = async (endpoint) => {
    return await queryApi(endpoint, { method: "DELETE" }, true);
};