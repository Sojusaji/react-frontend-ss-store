import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Signup.css';
import { signup, sentOtp } from "../../../services/Api";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [otpResponse, setOtpResponse] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState(null);

  const [otpExpiresAt, setOtpExpiresAt] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    if (otpExpiresAt) {
      const timeout = setTimeout(() => {
        setOtp(null);
        setOtpExpiresAt(null);
        setIsButtonDisabled(false); // Enable the button after 10 minutes
      }, 10 * 60 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [otpExpiresAt]);


  const handleOtpVerification = async () => {

    // if (otp && Date.now() < otpExpiresAt) {
    //   alert('Please wait until the OTP expires.');
    //   return;
    // }

    if (email) {
      setIsProcessing(true)
      setIsButtonDisabled(true)
      try {
        const response = await sentOtp(email)
        console.log('otp result:', response.data.otpSentSuccess)
        setOtpResponse(response.data.otpSentSuccess)

        // Set OTP expiration time (e.g., 10 minutes from now) 
        const expiresAt = Date.now() + 10 * 60 * 1000;
        setOtpExpiresAt(expiresAt);

        alert('OTP sent successfully')
      } catch (error) {
        console.log('error:', error)
        alert(error)
        setIsButtonDisabled(false)
        setIsProcessing(false)
      }
    } else {
      alert('Please enter your gmail')
    }
    setIsProcessing(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (otp) {
      const data = { name, email, password, otp }
      console.log('signup datas recieved:', data)
      try {
        const response = await signup(data)
        if (response.data.signupSuccess) {
          alert('Signup success')
          navigate('/')
        } else {
          alert(response.data.err)
        }

      } catch (error) {
        alert(error)
      }
    }else{
      alert("Please verify your GMAIL ID")
    }
  };


  return (
    <Container fluid className="signup-container">
      <Row className="justify-content-center align-items-center ">
        <Col md={6} lg={4} className="signup-form">
          <h2 className="text-center mb-4">Create an Account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName" className="mb-1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleOtpVerification} disabled={isButtonDisabled || isProcessing}>{
                isProcessing ? "processing..." : "Generate OTP"
              }</Button>
            </Form.Group>

            {otpResponse
              ? <Form.Group controlId="formBasicOtp" className="mb-1">
                <Form.Label>Enter your otp</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your otp"
                  value={otp}
                  required
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              : ""
            }
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
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
