import React from 'react';

const CampaignItem = (campana) => (
  <article>
    <a href="#" className="image"><img src={``} alt={campana.nom_campaña} /></a>
    <h3>{campana.nom_campaña}</h3>
    <p>{campana.descripcion}</p>
    <p>{campana.cupos}</p>
    <ul className="actions">
      <li><a href="#" className="button">Postúlate</a></li>
    </ul>
  </article>
);

export default CampaignItem;
