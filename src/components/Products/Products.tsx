import { FC } from 'react';
import { Badge, ListGroup, Table } from 'react-bootstrap';

interface ProductsProps { }

const Products: FC<ProductsProps> = () => {
  return (
    <ListGroup as="ol" numbered>
      <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">Subheading</div>
          Cras justo odio
        </div>
        <Badge bg="success" pill>
          14
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default Products;
