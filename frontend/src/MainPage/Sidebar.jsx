import React from 'react';
import MenuItem from './MenuItem';

const Sidebar = () => {
  const menuItems = [
    { href: '/', label: 'Homepage' },
    { href: '/generic', label: 'Generic' },
    { href: '/login', label: 'Login' },
  ];

  const miniPosts = [
    { imgSrc: '/images/pic07.jpg', description: 'Aenean ornare velit lacus...' },
    { imgSrc: '/images/pic08.jpg', description: 'Aenean ornare velit lacus...' },
    { imgSrc: '/images/pic09.jpg', description: 'Aenean ornare velit lacus...' },
  ];

  return (
    <div id="sidebar">
      <div className="inner">
        <nav id="menu">
          <header className="major">
            <h2>Menu</h2>
          </header>
          <ul>
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </ul>
        </nav>
        <section>
          <header className="major">
            <h3>Ante interdum</h3>
          </header>
          <div className="mini-posts">
            {miniPosts.map((post, index) => (
              <article key={index}>
                <a href="#" className="image"><img src={post.imgSrc} alt="" /></a>
                <p>{post.description}</p>
              </article>
            ))}
          </div>
          <ul className="actions">
            <li><a href="#" className="button">More</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
