import { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

function AddProductPage() {
  const [formData, setFormData] = useState({ title: "", price: "", description: "", category: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      await axios.post("https://fakestoreapi.com/products", {
        ...formData,
        price: Number(formData.price),
        image: "https://i.pravatar.cc",
      });
      setMessage("Product created successfully in the mock API response. It will not permanently appear in the product list.");
      setFormData({ title: "", price: "", description: "", category: "" });
    } catch (error) {
      setError("Product could not be created. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="mb-4">Add Product</h1>
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
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Creating..." : "Create Product"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddProductPage;
