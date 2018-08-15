import * as React from 'react';

export const Header = () => {
  const ghSrcUrl = 'https://github.com/gd8/twitter-trolls';
  return (
    <header>
      <nav className="navbar is-info">
        <div className="navbar-brand">
          <a className="navbar-item">Twitter Trolls</a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href={ghSrcUrl}>
              Source
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
