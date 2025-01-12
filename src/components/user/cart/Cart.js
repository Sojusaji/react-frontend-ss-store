import { React, useEffect, useState } from 'react';
import TableData from './table-data/TableData';
import InfoCard from './card-data/CardData';
import { getCart } from '../../../services/Api'
// import {getCart } from '../../../services/Api'
import { Container, Row, Col } from 'react-bootstrap';
import './Cart.css'

function Cart() {
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const[total,setTotal]=useState([])
  

    useEffect(() => {
        const fetchCartDatas = async () => {
            const response = await getCart()
            console.log('response:', response)
            setUser(response.data.user)
            setProducts(response.data.products)
            setTotal(response.data.totalValue)

        }
        fetchCartDatas()

    }, [])

    useEffect(() => {
        document.body.style.background = 'white';
        return () => {
            document.body.style.background = '';
        };
    }, [])

    return (
        user !== null && products !==0
            ? (<Container className=" my-1">
                <Row className=" d-none d-lg-block ">
                    <Col>
                        <TableData products={products} total={total} setProducts={setProducts}/>
                    </Col>
                </Row>
                <Row className="d-block d-lg-none my-4">
                    <Col>
                        <InfoCard
                            title="Card Title"
                            text="Some quick example text to build on the card title and make up the bulk of the card's content."
                            buttonText="Go somewhere"
                        />
                    </Col>
                </Row>
            </Container>)
            : (
                user === null
                    ? (<div><h1 className="titleOne">You are not logged in ,Please login first</h1></div>)
                    : (<div><h1 className="titleOne">You have not add nothing to cart</h1></div>)
            )
    );
}

export default Cart;
