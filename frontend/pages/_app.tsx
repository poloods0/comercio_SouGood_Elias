import '../assets/styles/styles.css';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import Layout from '../components/layouts/layout';
import 'bootstrap/dist/css/bootstrap.css';
import { SSRProvider } from 'react-bootstrap';
import Head from 'next/head';
import Cart from '../components/cart/cart';
import { Drawer } from '@mui/material';
import { CartProvider } from '../contexts/cartContext';
import { UserProvider } from '../contexts/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <SSRProvider>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <UserProvider>
        <CartProvider>
          <Layout openCart={() => setIsCartOpen(true)}>
            <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
              <Cart />
            </Drawer>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </UserProvider>
    </SSRProvider>
  );
}

export default MyApp
