import React from 'react';

const MenuItem = ({ href, label }) => (
  <li><a href={href}>{label}</a></li>
);

export default MenuItem;
