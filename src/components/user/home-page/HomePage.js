import { React, useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Banner from "./banner/Banner";
import { FetchContext } from "../context/FetchContex";
// import axios from 'axios';
import { getAllProducts } from "../../../services/Api";

import './HomePage.css'
import ProductCard from './scroll-view/ProductCard';



function HomePage() {
  const { banner, setBanner, rowOne, setRowOne, rowTwo, setRowTwo,setUser} = useContext(FetchContext)



  useEffect(() => {
    getAllProducts().then(products => {
      console.log('produts:', products)
      setBanner(products.data.banner)
      setRowOne(products.data.rowOne)
      setRowTwo(products.data.rowTwo)
      setUser(products.data.user)
    })
  },
    []);

  return (
    <div className='outerDiv '>
      <Container >
        <Row>
          <Col className='banner mt-2' xs={12} md={12} lg={12} xl={12}>
            <Banner />
          </Col>
          <h1 className="title mt-5">Trending Products</h1>
          <Col className='scrollable-card'>

            {
              rowOne.map(product => (
                <ProductCard key={product._id} product={product} imageFolder="rowOne-images" />))
            }

          </Col>
          <h1 className="title mt-5">Listed market awailabe products here</h1>
          <Col className='scrollable-card'>

            {
              rowTwo.map(product => (
                <ProductCard key={product._id} product={product} imageFolder="rowTwo-images" />))
            }

          </Col>

        </Row>

      </Container>
    </div>
  )
}

export default HomePage