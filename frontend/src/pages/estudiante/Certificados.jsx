import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeEstudiante from "./HomeEstudiante";
import GenCertificados from "./GenCertificados";
import Horas from "./Horas";
import PerfilEstudiante from "./PerfilEstudiante";
import Postularse from "./Postularse";
import { Form } from "react-router-dom";

export default function Certificados() {
    return (
        <div>
            import React from "react";
            <div>
                {<HomeEstudiante />}
                {<GenCertificados />}
                {<Horas />}
                {<Notification />}
                {<PerfilEstudiante />}
                {<Postularse />}
            </div>
        </div>
    );
}
