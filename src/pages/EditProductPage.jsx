import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

function EditProductPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setFormData(response.data);
      } catch (error) {
        setError("Product could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, {
        ...formData,
        price: Number(formData.price),
      });
      setMessage("Product update request was successful. FakeStoreAPI is a mock API, so the change will not persist after refreshing.");
    } catch (error) {
      setError("Product could not be updated. Please try again.");
    } finally {
      setSubmitting(false);
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

  if (error && !formData) {
    return <h1 className="text-center py-5">{error}</h1>;
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="mb-4">Edit Product</h1>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" variant="warning" disabled={submitting}>
              {submitting ? "Updating..." : "Update Product"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EditProductPage;
