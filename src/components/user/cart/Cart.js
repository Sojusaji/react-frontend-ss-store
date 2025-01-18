import { React, useEffect, useState ,useContext} from 'react';
import TableData from './table-data/TableFormat';
import InfoCard from './card-data/CardData';
import { getCart } from '../../../services/Api'
import { FetchContext } from "../context/FetchContex";
// import {getCart } from '../../../services/Api'
import { Container, Row, Col } from 'react-bootstrap';
import './Cart.css'

function Cart() {
    const {user,setUser}=useContext(FetchContext)
    
    const [products, setProducts] = useState([])
    const[total,setTotal]=useState(null)
    const[isLoading,setIsLoading]=useState(true)
   
    useEffect(() => {
        const fetchCartDatas = async () => {
            const response = await getCart()
            console.log('response:', response)
            setUser(response.data.user)
            setProducts(response.data.products)
            setTotal(response.data.totalValue)
            setIsLoading(false)
        }
        fetchCartDatas()

    }, [])

    useEffect(() => {
        document.body.style.background = 'white';
        return () => {
            document.body.style.background = '';
        };
    }, [])
  
    if(isLoading){
        return <p className='titleOne'>Loading cart data...</p>
    }

    return (
        user!== null && products?.length
            ? (<Container className=" my-1">
                <Row className=" d-none d-lg-block ">
                    <Col>
                        <TableData products={products} total={total} setProducts={setProducts} setTotal={setTotal}/>
                    </Col>
                </Row>
                <Row className="d-block d-lg-none my-4">
                    <Col>
                        <InfoCard
                           products={products} total={total} setProducts={setProducts} setTotal={setTotal}
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
