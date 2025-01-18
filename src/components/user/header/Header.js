import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/Api'
import { FetchContext } from '.././context/FetchContex'
import './Header.css';



const NavBar = () => {
  const navigate = useNavigate()
  const { cartCount, user, setUser } = useContext(FetchContext)
  const [showSearchBar, setShowSearchBar] = useState(true);


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout()
      console.log('response:', response)
      if (response.data.status) {
        setUser(null)
      }
    } catch (error) {
      alert(error)
    }
  }

  const checkHamburgerVisibility = () => {
    const navbarToggler = document.getElementById('hamburgerButton');
    const searchBar = document.querySelector('.searchBar');

    if (window.getComputedStyle(navbarToggler).display !== 'none') {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  };

  useEffect(() => {
    checkHamburgerVisibility();
    window.addEventListener('resize', checkHamburgerVisibility);
    return () => window.removeEventListener('resize', checkHamburgerVisibility);
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Shopping Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" id="hamburgerButton" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Products</Nav.Link>
            {
              user ? (<Nav.Link as={Link} to="/cart">
                Cart <span className="badge badge-success" id="cart-count">{cartCount}</span>
              </Nav.Link>)
                : (<Nav.Link as={Link} to="/Login">
                  Cart <span className="badge badge-success" id="cart-count">{cartCount}</span>
                </Nav.Link>)
            }
           
            {(user != null) && <Nav.Link as={Link} to="/orders">Orders</Nav.Link>}
            <Nav.Item className="searchBar" style={{ display: showSearchBar ? 'flex' : 'none' }}>
              <Form className="d-flex">
                <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
                <Button type="submit">Search</Button>
              </Form>
            </Nav.Item>
            <span className="nav-indicator"></span>
          </Nav>
          <NavDropdown title={(user != null) ? user.name : "Account"} id="dropdownMenuButton" className="mr-5">
            {
              (user != null)
                ? (<NavDropdown.Item onClick={handleLogout} className='custom-dropdown-item'>Logout</NavDropdown.Item>)
                : (<NavDropdown.Item as={Link} to="/Login" className='custom-dropdown-item'>Login</NavDropdown.Item>)

            }
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;


