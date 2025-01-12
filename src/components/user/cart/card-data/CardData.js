import React from 'react';
import { Card, Button } from 'react-bootstrap';

const InfoCard = ({ title, text, buttonText }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary">{buttonText}</Button>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
