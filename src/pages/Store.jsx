import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const productsArr = [
  { title: 'Colors', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png' },
  { title: 'Black and white Colors', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png' },
  { title: 'Yellow and Black Colors', price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png' },
  { title: 'Blue Color', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png' },
];

function Store() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Store</h1>
      <Row>
        {productsArr.map((product, index) => (
          <Col key={index} sm={12} md={3} lg={2} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button variant="primary" onClick={()=>dispatch(addToCart(product))}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Store;
