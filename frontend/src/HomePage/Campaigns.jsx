import React from 'react';
import CampaignItem from './CampaignItem';

const campaigns = [
  { title: 'Comedor', description: 'Fomenta la solidaridad...', image: '/images/pic01.jpg' },
  { title: 'Enfermería', description: 'Permite a los estudiantes...', image: '/images/pic02.jpg' },
  { title: 'Orientación', description: 'Apoya a sus compañeros...', image: '/images/pic03.jpg' },
  { title: 'Salón', description: 'Contribuye a un ambiente...', image: '/images/pic04.jpg' },
  { title: 'Biblioteca', description: 'Promueve el acceso...', image: '/images/pic05.jpg' },
  { title: 'Coordinación', description: 'Apoya en la organización...', image: '/images/pic06.jpg' },
];

const Campaigns = () => (
  <section>
    <header className="major">
      <h2>Campañas disponibles</h2>
    </header>
    <div className="posts">
      {campaigns.map((campaign, index) => (
        <CampaignItem key={index} {...campaign} />
      ))}
    </div>
  </section>
);

export default Campaigns;
