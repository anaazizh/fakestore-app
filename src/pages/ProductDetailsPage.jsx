import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Product could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setShowDeleteModal(false);
      window.alert("Product delete request was successful. FakeStoreAPI is a mock API, so the product will return after refreshing.");
      navigate("/products");
    } catch (error) {
      setShowDeleteModal(false);
      window.alert("Product could not be deleted. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center py-5">{error}</h1>;
  }

  return (
    <>
      <Container className="py-5">
        <Button as={Link} to="/products" variant="secondary" className="mb-4">
          Back to Products
        </Button>
        <Row className="g-5 align-items-center">
          <Col md={5}>
            <img src={product.image} alt={product.title} className="img-fluid product-details-image" />
          </Col>
          <Col md={7}>
            <p className="text-capitalize text-muted">{product.category}</p>
            <h1>{product.title}</h1>
            <h2 className="text-primary my-3">${product.price}</h2>
            <p>{product.description}</p>
            <Button variant="success" className="me-2">Add to Cart</Button>
            <Button as={Link} to={`/edit-product/${id}`} variant="warning">Edit Product</Button>
            <Button variant="danger" className="ms-2" onClick={() => setShowDeleteModal(true)}>
              Delete Product
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDetailsPage;
