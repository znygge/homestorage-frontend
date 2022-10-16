import { FC } from "react";
import { Badge, ListGroup, Table } from "react-bootstrap";
import { Product } from "../../datastructures";

interface ProductsProps {
  data: Array<Product>;
  onClick?: Function;
}

const Products: FC<ProductsProps> = (props: ProductsProps) => {
  const itemClicked = (event: any, i: number) => {
    if(props.onClick)
      props.onClick(props.data[i]);
  }
  return (
    <ListGroup as="ol" numbered>
      {
      props.data.map((item, i) => {
        return (
          <ListGroup.Item
            as="li"
            key={i}
            className="d-flex justify-content-between align-items-start"
            onClick={event=>itemClicked(event,i)}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
            </div>
            <Badge bg="success" pill>
              {`${item.amount} ${item.unit}` }
            </Badge>
          </ListGroup.Item>
        );
      })
      }
    </ListGroup>
  );
};

export default Products;
