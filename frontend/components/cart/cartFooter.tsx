import React, { useState, useEffect } from "react";
import OrganizationSelector from "./organizationSelector";
import { Button } from "../shared/buttons";
import styles from '../../assets/styles/components/cart.module.css';

interface Props {
  total: number;
}

const CartFooter = (props: Props) => {

  const [total, setTotal] = useState<number>(props.total);

  useEffect(() => {
    setTotal(props.total);
  }, [props.total]);

  return (
    <div className={styles.cartFooter}>
      <div className={styles.total}>
        <h3>Total: $ {total}</h3>
      </div>
      <div className={styles.organizationSelector}>
        <h5>¿A qué organización deseas que nosotros donemos el 20% de tu compra?</h5>
        <OrganizationSelector></OrganizationSelector>
      </div>
      <Button onClick={() => console.log("Compra por implementar")} text={"Ir a pagar"} />
    </div>
  );
}

export default CartFooter;
