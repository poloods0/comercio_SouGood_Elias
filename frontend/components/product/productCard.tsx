import React, { useEffect, useState } from 'react';
import styles from '../../assets/styles/components/productCard.module.css';
import Image from 'next/image';
import Router from 'next/router';
import { Row, Col } from 'react-bootstrap';
import Product from '../../types/product';

interface ProductCardProps {
  product: Product;
  showDetails: (product: Product) => void,
};

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const [product, setProduct] = useState<Product>();
  const [image, setImage] = useState<string>("image-default.png");

  useEffect(() => {
    setProduct(props.product);
    if (props.product.image) setImage(props.product.image);
  }, [props.product]);

  const styleOptions = {
    'small': styles.small,
    'medium': styles.medium,
    'large': styles.large,
  };

  const showDetails = () => {
    props.showDetails(product);
  };

  return (
    <>
    { product &&
      <div className={styles.productCard + " " + styleOptions[product.size]} onClick={showDetails}>
        <div className={styles.productCardImageContainer}>
          <Image src={require('../../assets/images/' + image)} className={styles.productCardImage} layout="fill" />
        </div>
        <Row>
          <Col className={styles.productName + " " + styles.productText}><span>{product.name}</span></Col>
          <Col className={styles.productCategory + " " + styles.productText} onClick={(e) => { e.stopPropagation(); Router.push('/catalog/' + product.category.name) }}><span>{product.category.name}</span></Col>
        </Row>

        <div className={styles.productCardTags + " " + styles.productText}>
          {product.tags.length > 0 && product.tags.reduce((prevTag, currTag) => "#" + prevTag + " #" + currTag)}
        </div>
      </div>
    }
    </>
  );
}

export default ProductCard;
