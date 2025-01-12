import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { login } from "../../../services/Api"
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, password }
    try {
      const response = await login(data)
      console.log('response:', response)
      if (response.data.status) {
          navigate('/')
      } else {
        alert(response.data.err)
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  };

  return (
    <Container fluid className="login-container ">
      <Row className="justify-content-center align-items-center  " >

        <Col md={6} lg={4} className="login-form ">
          <h2 className="text-center mb-4">Welcome Back</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <div className="right-align">
              <Button as={Link} to={'/signup'} variant='success' > Create an account </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
