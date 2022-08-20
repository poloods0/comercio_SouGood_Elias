import React, { useState, useEffect } from 'react';
import { useCartItemsContext } from '../../../contexts/cartContext';
import { useRouter } from 'next/router';
import { Navbar, Nav, Container, Button}  from 'react-bootstrap';
import { Badge } from '@mui/material';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryItem from './CategoryItem';
import styles from '../../../assets/styles/header.module.css';
import { useUserContext } from '../../../contexts/userContext';
import { getCategories } from '../../../lib/categories';

// const CATEGORIES = [ 
//   { 
//     id: 1,
//     name: "Bienestar Ambiental, Animal y Humano",
//     subcategories: [
//     "Carta Menú", "Cosmética natural & productos funcionales",
//     "Insumos y Abarrotes saludables", "Agricultura", "Cuidado de enfermos",
//     "Implementos deportivos"
//     ]
//   },
//   {
//     id: 2,
//     name: "Bazar",
//     subcategories: [
//     "Arte & Decoración", "Materiales & Herramientas",
//     "Bazar", "Limpieza"
//     ],
//   },
//   {
//     id: 3,
//     name:"Vida Sostenible",
//     subcategories: [
//     "Handyman & Servicios profesionales", "Bioconstrucción",
//     "Tecnología, Automatización & Electrónica", "Corretaje & Propiedades",
//     "Recreación & Turismo", "Delivery"
//     ]
//   },
//   {
//     id: 4,
//     name: "Clubes del buen vivir",
//     subcategories: [
//     "Huertas Comunitarias", "Trueques", "Mascotas",
//     "Guías & Scouts", "Donaciones", "Deportes", "Artes & Hobbies"
//     ]
//   }
// ];

interface NavBarProps {
  openCart: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ openCart }) => {
  const {token, role, removeToken} = useUserContext();
  const router = useRouter();
  const { getTotalItems, cartItems } = useCartItemsContext();
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch categories from backend
    getCategories().then(categories => setCategories(categories)).catch(e => alert(e));
  }, [])

  const listCategories = categories.map(category => <CategoryItem key={category._id} category={category.name} subcategories={category.subcategories} componentStyle={styles.category}/>);

  return (
    <Navbar collapseOnSelect className={styles.navBar} expand="lg">
      <Container className={styles.navbarContainer} fluid>
        <Navbar.Brand className={styles.navBarBrand} href="/catalog">
          <Image src={require('../../../assets/images/logoSougood.png')} width="200px" height="60px"></Image>
        </Navbar.Brand>
        <Nav className='justify-content-around flex-grow-1 pe-3' >
          {listCategories}
        </Nav>
        <Nav>
          { role == 'admin' &&
            <Button onClick={() => router.push('/management')} className={styles.iconButton} variant="outline-success">Administrar</Button>
          }
          {token ? 
            <Button onClick={() => removeToken()} className={styles.iconButton} variant="outline-success">Cerrar sesión</Button> : 
            <Button onClick={() => router.push('/register')} className={styles.iconButton} variant="outline-success">Ingresar</Button>
          }
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <Button onClick={openCart} className={styles.iconButton} variant="outline-success"><ShoppingCartIcon /></Button>
          </Badge>
        </Nav>
      </Container>
    </Navbar >);
};

export default NavBar;
