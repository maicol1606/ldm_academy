import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

// Hooks
import { useGetData } from "../lib/fetchData.js";

export default function Campaigns() {
    const { data: campanas, loading: isLoading } = useGetData("/campanas/mostrarCampanas");

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <section className="container justify-content-center p-5">
            <header className="">
                <h2>Campañas disponibles</h2>
            </header>
            <div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                    {campanas.map((campana, index) => (
                        <div className="col" key={campana.id || index}>
                            <article>
                                <a href="#" className="">
                                    <img
                                        width={100}
                                        height={100}
                                        src={`/img/campañas/${campana.imagen}`}
                                        alt={campana.nom_campaña}
                                    />
                                </a>
                                <h3>{campana.nom_campaña}</h3>
                                <p>{campana.descripcion}</p>
                                <p>Cupos: {campana.cupos}</p>
                                <p>Fecha de inicio: {moment(campana.fecha).format("DD/MM/YYYY")}</p>
                                <Link to="/login" className="button">
                                    Postúlate
                                </Link>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CampaignItem(campana) {
    return (
        <article>
            <a href="#" className="image">
                <img src={``} alt={campana.nom_campaña} />
            </a>
            <h3>{campana.nom_campaña}</h3>
            <p>{campana.descripcion}</p>
            <p>{campana.cupos}</p>
            <ul className="actions">
                <li>
                    <a href="#" className="button">
                        Postúlate
                    </a>
                </li>
            </ul>
        </article>
    );
}
