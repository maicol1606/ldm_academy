import React from 'react';

const MiniPost = ({ image, description }) => (
  <article>
    <a href="#" className="image"><img src={image} alt="Mini post" /></a>
    <p>{description}</p>
  </article>
);

export default MiniPost;
