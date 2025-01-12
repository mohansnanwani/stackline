import React from 'react';
import './Header.css';
import { ReactComponent as Logo } from '../stackline_logo.svg';   //this is not an error

const Header: React.FC = () => {
  return (
    <header className="header-banner">
      <div className="logo-container">
        <Logo className="logo" />
      </div>
    </header>
  );
};

export default Header;
