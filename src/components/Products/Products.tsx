import { FC } from "react";
import { Badge, ListGroup, Table } from "react-bootstrap";
import { Product } from "../../datastructures";

interface ProductsProps {
  data: Array<Product>;
}

const Products: FC<ProductsProps> = (props: ProductsProps) => {
  return (
    <ListGroup as="ol" numbered>
      {
      props.data.map((item, i) => {
        return (
          <ListGroup.Item
            as="li"
            key={i}
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
            </div>
            <Badge bg="success" pill>
              {item.amount}
            </Badge>
          </ListGroup.Item>
        );
      })
      }
    </ListGroup>
  );
};

export default Products;
