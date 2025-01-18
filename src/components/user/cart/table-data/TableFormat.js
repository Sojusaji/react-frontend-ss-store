
import Table from 'react-bootstrap/Table';
import { Button, Container, Row, Col } from 'react-bootstrap'
import { FetchContext } from "../../../user/context/FetchContex"

import { React, useEffect, useState ,useContext} from 'react';
import './TableFormat.css';
import { removeProduct, changeQuantity } from '../../../../services/Api'

function TableData({ products, total, setProducts, setTotal }) {
   const { setUser, user } = useContext(FetchContext)

  const handleItemRemove = async (productId, cartId) => {
    console.log('productID:' + productId + "cartId: " + cartId)
    try {
      const response = await removeProduct({ productId, cartId })
      if (response.data.user===null) {
        console.log("user:" + response.data.user)
        setUser(response.data.user)

        console.log('user:' , user)
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
      console.log('respose: ', response)
      if (response.data.user===null) {
        console.log("user:" + response.data.user)
        setUser(response.data.user)

        console.log('user:' , user)
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
          <div >
            <Table striped className='mt-5'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>  </th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product, index) => (
                    <tr>
                      <td>
                        {
                          product.position === "rowOne"
                            ? <img src={`http://localhost:5002/product-images/rowOne-images/${product.item}.jpg`} alt='hello'
                              style={{ width: "50px", height: "50px" }} />
                            : <img src={`http://localhost:5002/product-images/rowTwo-images/${product.products._id}.jpg`} alt='processing'
                              style={{ width: "50px", height: "50px" }} />
                        }
                      </td>
                      <td>{product.products.Name}</td>
                      <td>
                        <Button variant="success" onClick={() => { handleChangeQuantityButton(product.products._id, product._id, product.quantity, 1) }}>+</Button>
                        <input type='text' readOnly value={product.quantity}></input>
                        <Button variant="success" onClick={() => { handleChangeQuantityButton(product.products._id, product._id, product.quantity, -1) }}>-</Button>
                      </td>
                      <td>{product.products.Price}</td>
                      <td><button type="button" onClick={() => handleItemRemove(product.products._id, product._id)} className='btn btn-danger'>Remove</button></td>

                    </tr>
                  ))

                }
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total: {total}.Rs</td>
                  <td> <Button variant="success" onClick={
                    () => {  }
                  }>Pay now</Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default TableData;