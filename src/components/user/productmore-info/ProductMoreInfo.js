

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ProductMoreInfo.css'; // Import your custom styles

const ProductMoreInfoPage = () => {
  const location = useLocation();
  const { product } = location.state; // Access the product data

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Container className="product-detail">
      <Row className="mt-5">
        <Col md={6}>

        {

          product.position === 'rowOne'
             ? <img src={`http://localhost:5002/product-images/rowOne-images/${product._id}.jpg`} alt={product.Name}  className="product-image"/>
             : <img src={`http://localhost:5002/product-images/rowTwo-images/${product._id}.jpg`} alt={product.Name}  className="product-image"/>

         }
        </Col>
        <Col md={6}>
          <h1 className="product-title">{product.Name}</h1>
          <p className="product-description">{product.Description}</p>
          <h3 className="product-price">Rs: {product.Price}</h3>
          <Button className="btn btn-success" onClick={() => alert('Added to cart!')}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductMoreInfoPage;
