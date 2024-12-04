import React from "react";
import campaigns from "../../data/campaigns";

const Campaigns: React.FC = () => {
  return (
    <div>
      <h2>Campañas Disponibles</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <strong>{campaign.name}</strong> - {campaign.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campaigns;

