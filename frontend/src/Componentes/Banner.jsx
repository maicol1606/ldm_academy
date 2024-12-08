import React from 'react';

const Banner = () => (
  <section id="banner">
    <div className="content">
      <header>
        <h1>Listo para iniciar<br /> tu servicio social?</h1>
        <p>Todo estudiante debe hacerlo</p>
      </header>
      <p>
        El servicio social constituye una actividad que permite al estudiante en formación,
        retribuir a la sociedad, contribuyendo con propuestas de solución y aplicación de
        conocimientos integrales hacia los sectores más desfavorecidos.
      </p>
      <ul className="actions">
        <li><a href="#" className="button big">Postúlate</a></li>
      </ul>
    </div>
    <span className="image object">
      <img src="/images/pic10.jpg" alt="Banner" />
    </span>
  </section>
);

export default Banner;

