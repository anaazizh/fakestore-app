import { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const DEFAULT_CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
];

const empty = {
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
};

export default function ProductForm({
  initialValues,
  onSubmit,
  submitting,
  submitLabel = 'Save product',
}) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title ?? '',
        price: initialValues.price ?? '',
        description: initialValues.description ?? '',
        category: initialValues.category ?? '',
        image: initialValues.image ?? '',
      });
    }
  }, [initialValues]);

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = 'Title is required.';
    if (values.price === '' || Number.isNaN(Number(values.price)) || Number(values.price) < 0)
      next.price = 'Enter a valid price.';
    if (!values.description.trim()) next.description = 'Description is required.';
    if (!values.category.trim()) next.category = 'Pick a category.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...values,
      price: Number(values.price),
    });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="pf-title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={values.title}
          onChange={update('title')}
          isInvalid={!!errors.title}
          placeholder="e.g. Heritage Leather Crossbody"
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="pf-price">
            <Form.Label>Price (USD)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              value={values.price}
              onChange={update('price')}
              isInvalid={!!errors.price}
              placeholder="49.00"
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group className="mb-3" controlId="pf-category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={values.category}
              onChange={update('category')}
              isInvalid={!!errors.category}
            >
              <option value="">Select a category</option>
              {DEFAULT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="pf-description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={values.description}
          onChange={update('description')}
          isInvalid={!!errors.description}
          placeholder="Tell shoppers what makes this product worth picking up."
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="pf-image">
        <Form.Label>Image URL <span className="text-muted">(optional)</span></Form.Label>
        <Form.Control
          type="url"
          value={values.image}
          onChange={update('image')}
          placeholder="https://…"
        />
      </Form.Group>

      <Button type="submit" className="btn-brand" disabled={submitting}>
        {submitting ? 'Submitting…' : submitLabel}
      </Button>
    </Form>
  );
}
