import React from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Stripe from 'stripe';
import Booking from '../components/Booking/Booking';

const Payment = () => {
  const stripe = new Stripe('pk_test_51Mxk2HBpiNacl6wZzFm5TwYnkA8QrqBsc1XCDRFcIukpqynG03FAkiPYM5ACJdUXKG0rS8mNeLbgbcAoyJPoVUP500GNPHyAy8');

  const handlePayment = async (event) => {
    event.preventDefault();

    const { token } = await stripe.createToken({
      name: document.getElementById('name').value,
      card: {
        number: document.getElementById('cardNumber').value,
        exp_month: document.getElementById('expiryMonth').value,
        exp_year: document.getElementById('expiryYear').value,
        cvc: document.getElementById('cvv').value,
      },
    });

    const response = await fetch('/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.id,
        amount: document.getElementById('amount').value,
      }),
    });

    if (response.ok) {
      alert('Payment successful!');
    } else {
      alert('Payment failed!');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Payment Details</h2>
          <Form>
            <FormGroup>
              <Label for='name'>Name on Card</Label>
              <Input type='text' id='name' />
            </FormGroup>
            <FormGroup>
              <Label for='cardNumber'>Card Number</Label>
              <Input type='text' id='cardNumber' />
            </FormGroup>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for='expiryMonth'>Expiry Month</Label>
                  <Input type='text' id='expiryMonth' />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for='expiryYear'>Expiry Year</Label>
                  <Input type='text' id='expiryYear' />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for='cvv'>CVV</Label>
                  <Input type='text' id='cvv' />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for='amount'>Amount</Label>
              <Input type='text' id='amount' />
            </FormGroup>
            <Button color='primary' id='pay-now' onClick={handlePayment}>Pay Now</Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Billing Address</h2>
          <Form>
            <FormGroup>
              <Label for='address'>Address</Label>
              <Input type='text' id='address' />
            </FormGroup>
            <FormGroup>
              <Label for='city'>City</Label>
              <Input type='text' id='city' />
            </FormGroup>
            <FormGroup>
              <Label for='state'>State</Label>
              <Input type='text' id='state' />
            </FormGroup>
            <FormGroup>
              <Label for='zip'>Zip</Label>
              <Input type='text' id='zip' />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
