import React from 'react';
import MiniPost from './MiniPost';

const Sidebar = () => {
  const miniPosts = [
    { image: '/images/pic07.jpg', description: 'Aenean ornare velit lacus...' },
    { image: '/images/pic08.jpg', description: 'Aenean ornare velit lacus...' },
    { image: '/images/pic09.jpg', description: 'Aenean ornare velit lacus...' },
  ];

  return (
    <div id="sidebar">
      <div className="inner">
        <nav id="menu">
          <header className="major">
            <h2>Menú</h2>
          </header>
          <ul>
            <li><a href="/">Homepage</a></li>
            <li><a href="/generic">Generic</a></li>
            <li><a href="/AuthPage">login</a></li>
          </ul>
        </nav>
        <section>
          <header className="major">
            <h2>Postúlate</h2>
          </header>
          <div className="mini-posts">
            {miniPosts.map((post, index) => (
              <MiniPost key={index} {...post} />
            ))}
          </div>
          <ul className="actions">
            <li><a href="#" className="button">Más</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
