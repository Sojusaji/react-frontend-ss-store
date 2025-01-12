import { React, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import "./ProductCard.css"
import { FetchContext } from '../../context/FetchContex'
import { addToCart } from '../../../../services/Api'
const ProductCard = ({ product, imageFolder }) => {
  const navigate = useNavigate()
  const { cartItem, setCartItem ,setCartCount} = useContext(FetchContext)

  const onAddToCart = async (productId, position) => {
    console.log('productId $ Possision:', productId, position)
    const data = { productId, position }
    const cartCount = await addToCart(data)
      setCartCount(cartCount)
      console.log('cartCount:'+cartCount)
      // alert(cartCount)
    // const newItem = { productId, position }
    // setCartItem(prevItems => {
    //   const updatedItems = [...prevItems, newItem];
    //   // console.log('Updated cartItem:', updatedItems);
    //   return updatedItems;
    // });

  }
  const handleCardClick = () => {
    navigate('/ProductMoreInfo', { state: { product } });
  }
  // console.log('product and imageFolder:', product, imageFolder)
  return (
    <Card className=" mt-3  card" onClick={handleCardClick} >
      <Card.Img
        variant="top"
        className='card-image'
        src={`http://localhost:5002/product-images/${imageFolder}/${product._id}.jpg`}
        alt="processing..."
      />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold' }}>{product.Name}</Card.Title>
        <div className="moreDetails  d-none d-lg-block ">
          <Card.Text>{product.Description}</Card.Text>
          <Card.Title>Rs: {product.Price}</Card.Title>
        </div>
        <Button
          onClick={(event) => {
            console.log('cartItem:', cartItem)
            event.stopPropagation();
            onAddToCart(product._id, product.position);
          }}
          className="btn btn-success"
          id="addToCart"
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

