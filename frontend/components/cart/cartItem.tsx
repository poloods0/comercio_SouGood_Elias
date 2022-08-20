//import Button from "@mui/material/Button";
import { Button } from 'react-bootstrap';
//import Button from '../shared/buttons';
import ICartItem from "../../types/cart";
import styles from "../../assets/styles/components/cart.module.css";
import buttonStyle from "../../assets/styles/components/buttons.module.css";

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: string) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  const [image, setImage] = useState<string>("image-default.png");

  useEffect(() => {
    if (item.image) setImage(item.image);
  }, [item]);

  return (
  <div className={styles.cartItemContainer}>
    <div className={styles.cartItem}>
      <h3>{item.name}</h3>
      <div className={styles.information}>
        <p>Precio: $ {item.price}</p>
        <p>Total: $ {(item.price * item.amount)}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          size="sm"
          variant="outline-success"
          className={buttonStyle.buttonAmount}
          onClick={() => removeFromCart(item.id)}
        > - </Button>
        <p>Cantidad: {item.amount}</p>
        <Button
          size="sm"
          variant="outline-success"
          className={buttonStyle.buttonAmount}
          onClick={() => addToCart(item)}
        > + </Button>
      </div>
    </div>
    { image && <Image className={styles.productImage} src={require('../../assets/images/' + image)} width="120px" height="90px"></Image>}

  </div>
);
}

export default CartItem;
