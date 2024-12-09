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
    <span >
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.5058366807784!2d-74.1100757243239!3d4.502416343343151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3fa3ceaf844281%3A0x708e194f0a93e51a!2sCOLEGIO%20FERNANDO%20GONZALEZ%20OCHOA%20(IED)!5e0!3m2!1ses!2sco!4v1733783150546!5m2!1ses!2sco" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </span>
  </section>
);

export default Banner;

