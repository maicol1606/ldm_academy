import React, { useState, useEffect } from 'react';
import CampaignItem from './CampaignItem';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
    <section className="container justify-content-center p-5">
      <header className="">
        <h2>Campañas disponibles</h2>
      </header>
      <div >
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {campanas.map((campana, index) => (
            <div className='col'>
              <article>
                <a href="#" className=""><img width={100} height={100} src={`/img/campañas/${campana.imagen}`} alt={campana.nom_campaña} /></a>
                <h3>{campana.nom_campaña}</h3>
                <p>{campana.descripcion}</p>
                <p>Cupos: {campana.cupos}</p>
                <p>Fecha de inicio: {moment(campana.fecha).format('DD/MM/YYYY')}</p>
                <ul className="actions">
                  <li><Link to="/login" className="button">Postúlate</Link></li>
                </ul>
              </article>
            </div>
          ))}
        </div>
      
      </div>
    </section>
  )
};

export default Campaigns;
