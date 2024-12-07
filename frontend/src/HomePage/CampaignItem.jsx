import React from 'react';

const CampaignItem = ({ title, description, image }) => (
  <article>
    <a href="#" className="image"><img src={image} alt={title} /></a>
    <h3>{title}</h3>
    <p>{description}</p>
    <ul className="actions">
      <li><a href="#" className="button">Postúlate</a></li>
    </ul>
  </article>
);

export default CampaignItem;
