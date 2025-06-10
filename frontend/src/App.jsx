import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import AppLayout from "./layouts/appLayout";
import GuestLayout from "./layouts/guestLayout";

//admin
const AdminHome = lazy(() => import("./pages/Administrador/AdminHome"));
const CampaignList = lazy(() => import("./pages/Administrador/CampaignList"));
const CampaignNew = lazy(() => import("./pages/Administrador/CampaignNew"));
const CampaignSearch = lazy(() => import("./pages/Administrador/CampaignSearch"));
const EstudianteList = lazy(() => import("./pages/Administrador/EstudianteList"));
const EstudianteNew = lazy(() => import("./pages/Administrador/EstudianteNew"));
const DocenteList = lazy(() => import("./pages/Administrador/DocenteList"));
const DocenteNew = lazy(() => import("./pages/Administrador/DocenteNew"));
const NotificacionesAdmin = lazy(() => import("./pages/Administrador/NotificacionesAdmin"));
const CertificadoAdmin = lazy(() => import("./pages/Administrador/CertificadoAdmin"));

//estudiante
const BuscarCampañas = lazy(() => import("./pages/estudiante/BuscarCampañas"));
const Campañas = lazy(() => import("./pages/estudiante/Campañas"));
const GenCertificados = lazy(() => import("./pages/estudiante/GenCertificados"));
const PerfilEstudiante = lazy(() => import("./pages/estudiante/PerfilEstudiante"));
const Horas = lazy(() => import("./pages/estudiante/Horas"));
const HomeEstudiante = lazy(() => import("./pages/estudiante/HomeEstudiante"));
const Postularse = lazy(() => import("./pages/estudiante/Postularse"));
const Notificaciones = lazy(() => import("./pages/estudiante/Notificaciones"));
const InformacionCampaña = lazy(() => import("./pages/estudiante/InformacionCampaña"));
const ListCampañas = lazy(() => import("./pages/estudiante/ListCampañas"));

//docente
const AsignarHoras = lazy(() => import("./pages/Docente/AsignarHoras"));
const CrearCampaña = lazy(() => import("./pages/Docente/CrearCampaña"));
const GestionarCampañas = lazy(() => import("./pages/Docente/GestionarCampañas"));
const HomeDocentes = lazy(() => import("./pages/Docente/HomeDocentes"));
const PerfilDocente = lazy(() => import("./pages/Docente/PerfilDocente"));
const PostulacionesDocente = lazy(() => import("./pages/Docente/PostulacionesDocente"));

//default
const Error = lazy(() => import("./pages/Error"));
const Login = lazy(() => import("./pages/default/Login"));
const Registar = lazy(() => import("./pages/default/Registar"));
const OlvidarContrasena = lazy(() => import("./pages/default/OlvidarContrasena"));
const Recuperar = lazy(() => import("./pages/default/Recuperar"));
const HomePage = lazy(() => import("./pages/index"));

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rutas para el admin */}
                    <Route element={<AppLayout requiredAuth requiredRol={1} />}>
                        <Route path="/admin/" exact element={<AdminHome />} />
                        <Route path="/campaignList" element={<CampaignList />} />
                        <Route path="/CampaignNew" element={<CampaignNew />} />
                        <Route path="/CampaignSearch" element={<CampaignSearch />} />
                        <Route path="/EstudianteList" element={<EstudianteList />} />
                        <Route path="/DocenteList" element={<DocenteList />} />
                        <Route path="/DocenteNew" element={<DocenteNew />} />
                        <Route path="/EstudianteNew" element={<EstudianteNew />} />
                        <Route path="/NotificacionesAdmin" element={<NotificacionesAdmin />} />
                        <Route path="/CertificadoAdmin" element={<CertificadoAdmin />} />
                    </Route>

                    {/* Rutas para el estudiante */}
                    <Route element={<AppLayout requiredAuth requiredRol={2} />}>
                        <Route path="/HomeEstudiante" element={<Campañas />} />
                        <Route path="/perfil" element={<PerfilEstudiante />} />
                        <Route path="/buscarCampaña" element={<BuscarCampañas />} />
                        <Route path="/si" element={<HomeEstudiante />} />
                        <Route path="/postularse" element={<Postularse />} />
                        <Route path="/Horas" element={<Horas />} />
                        <Route path="/notificaciones" element={<Notificaciones />} />
                        <Route path="/GenCertificados" element={<GenCertificados />} />
                        <Route path="/InformacionCampaña" element={<InformacionCampaña />} />
                        <Route path="/ListCampañas" element={<ListCampañas />}></Route>
                    </Route>

                    {/* Rutas para el docente */}
                    <Route element={<AppLayout requiredAuth requiredRol={3} />}>
                        <Route path="/perfilDocente" element={<PerfilDocente />} />
                        <Route path="/asignarHoras" element={<AsignarHoras />} />
                        <Route path="/crearCampaña" element={<CrearCampaña />} />
                        <Route path="/gestionarCampañas" element={<GestionarCampañas />} />
                        <Route path="/homeDocentes" element={<HomeDocentes />} />
                        <Route path="/postulacionesDocente" element={<PostulacionesDocente />} />
                    </Route>

                    {/* Rutas para el default */}
                    <Route element={<GuestLayout requiredGuest />}>
                        <Route exact path="/register" element={<Registar />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/olvidarContrasena" element={<OlvidarContrasena />} />
                        <Route path="/recuperar" element={<Recuperar />} />
                    </Route>

                    <Route element={<AppLayout />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
