import React, { useState, useEffect } from 'react';
import CampaignItem from './CampaignItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const Campaigns = () => {

  const [campanas, setCampanas] = useState([]);

  console.log(campanas);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campanasRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/campanas/mostrarCampanas`),
        ]);
        setCampanas(campanasRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <header className="major">
        <h2>Campañas disponibles</h2>
      </header>
      <div className="posts">
      {campanas.map((campana, index) => (
        <article>
        <a href="#" className="image"><img src={``} alt={campana.nom_campaña} /></a>
        <h3>{campana.nom_campaña}</h3>
        <p>{campana.descripcion}</p>
        <p>Cupos: {campana.cupos}</p>
        <p>Fecha de inicio: {moment(campana.fecha).format('DD/MM/YYYY')}</p>
        <ul className="actions">
          <li><a href="#" className="button">Postúlate</a></li>
        </ul>
      </article>
      ))}
      </div>
    </section>
  )
};

export default Campaigns;
