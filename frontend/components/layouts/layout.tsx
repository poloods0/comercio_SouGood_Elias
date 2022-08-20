import React from 'react';
import NavBar from './header/index';
import ICartItem from '../../types/cart';

interface LayoutProps {
  children: any;
  openCart: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, openCart }) => {
  return (
    <React.Fragment>
      <NavBar openCart={openCart} />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
