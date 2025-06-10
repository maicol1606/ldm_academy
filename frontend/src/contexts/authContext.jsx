import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verify = async () => {
        setLoading(true);

        const token = localStorage.getItem("auth_token");
        if (!token) {
            setLoading(false);
            return setUser(null);
        }

        const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_DOMAIN}/api/auth/session`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
        });

        if (!response.ok) {
            setLoading(false);
            return setUser(null);
        }

        const { data } = await response.json();
        setUser(data);
        setLoading(false);
    };

    const logout = async () => {
        alert("Cerrando sesión...");
        localStorage.removeItem("auth_token");
        setUser(null);
        setLoading(false);
    };

    const reload = () => {
        verify();
    };

    useEffect(() => {
        verify();
    }, []);

    return (
        <AuthContext.Provider value={{ data: user, logout, reload, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
