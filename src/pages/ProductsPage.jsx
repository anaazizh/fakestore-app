import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        setError("Products could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center py-5">{error}</h1>;
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Products</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} sm={6} lg={4} xl={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="product-card-image"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-primary fw-bold">
                  ${product.price}
                </Card.Text>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsPage;
