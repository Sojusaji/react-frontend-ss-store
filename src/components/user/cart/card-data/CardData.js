import { React, useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { changeQuantity, removeProduct } from "../../../../services/Api";
import { FetchContext } from "../../../../components/user/context/FetchContex"
import'./CardData.css'

const InfoCard = ({ products, total, setProducts, setTotal }) => {
  console.log('products:', products)
  const { setUser, user } = useContext(FetchContext)

  const handleItemRemove = async (productId, cartId) => {
    console.log('productID:' + productId + "cartId: " + cartId)
    try {
      const response = await removeProduct({ productId, cartId })
      if (response.data.user === null) {
        console.log("user:" + response.data.user)
        setUser(response.data.user)

        console.log('user:', user)
        alert("Your session expired ,please login again")
      }
      if (response.data.removeProduct) {
        setProducts(prevProducts => prevProducts.filter(product => product.products._id !== productId));
      }
    } catch (error) {
      console.log('Failed to remove item:', error)
    }
  }

  const handleChangeQuantityButton = async (productId, cartId, quantity, count) => {
    console.log("product_id: " + productId + " cartID: " + cartId + " Quantity: " + quantity + " count: " + count)
    console.log(" count: " + count)
    try {
      const response = await changeQuantity({ productId, cartId, quantity, count })
      console.log('response:', response);

      if (response.data.user === null) {
        console.log("user:" + response.data.user)
        setUser(response.data.user)

        console.log('user:', user)
        alert("Your session expired ,please login again")
      }
      if (response.data.quantity) {
        setProducts(prevProducts => prevProducts.map(product =>
          product.products._id === productId
            ? { ...product, quantity: response.data.quantity }
            : product
        ));
        setTotal(response.data.total)
      }
      if (response.data.removeProduct) {
        setProducts(prevProducts => prevProducts.filter(product => product.products._id !== productId))

      }

    } catch (error) {
      alert(error)
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <div>
            {
              products.map((product, index) => (
                <Card className='ms-auto me-auto mb-3' style={{ width: '18rem' }}>
                  {
                    product.position === "rowOne"
                      ? (<Card.Img src={`http://localhost:5002/product-images/rowOne-images/${product.item}.jpg`} alt='hello'
                        style={{ width: '100px', height: '100px' }} />)
                      : (<Card.Img src={`http://localhost:5002/product-images/rowTwo-images/${product.products._id}.jpg`} alt='processing'
                        style={{ width: "100px", height: "100px" }} />)
                  }

                  <Card.Body>
                    <Card.Title>Title: {product.products.Name}</Card.Title>
                    <div>
                      Quantity : <Button variant="success" className="me-2" onClick={() => { handleChangeQuantityButton(product.products._id, product._id, product.quantity, 1) }}>+</Button>
                      <input type='text' style={{ width: '50px' }} readOnly value={product.quantity}></input>
                      <Button variant="success" className="ms-2" onClick={() => { handleChangeQuantityButton(product.products._id, product._id, product.quantity, -1) }}>-</Button>
                    </div>
                    <Card.Text>Price :{product.products.Price}.Rs</Card.Text>
                    <button type="button" onClick={() => handleItemRemove(product.products._id, product._id)} className='btn btn-danger'>Remove</button>
                  </Card.Body>
                </Card>
              ))
            }
          </div>
        </Col>
        <Col>
        <div className='total-amount '>
        <div className='amount'>Total: {total}.Rs</div>
        <div className='pay-button'><Button variant="success" onClick={() => {  }}>Pay now</Button></div>
        </div>
        

        </Col>
      </Row>
    </Container>
  );
};

export default InfoCard;
