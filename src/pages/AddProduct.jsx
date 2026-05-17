import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from '../api/fakestore';
import ProductForm from '../components/ProductForm';
import MockNotice from '../components/MockNotice';
import ErrorAlert from '../components/ErrorAlert';

export default function AddProduct() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const created = await createProduct(values);
      setSuccess({
        id: created?.id,
        title: values.title,
      });
    } catch (e) {
      setError('We could not submit the product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="page">
      <Row className="justify-content-center">
        <Col lg={8} xl={7}>
          <div className="mb-4">
            <div className="eyebrow">New product</div>
            <h1 className="section-title" style={{ fontSize: '1.85rem' }}>Add a product</h1>
            <p className="text-muted mb-0">
              Fill in the details below. We'll POST to FakeStoreAPI to create the product.
            </p>
          </div>

          <MockNotice />

          {error && <ErrorAlert message={error} />}

          {success ? (
            <Alert variant="success" className="mb-4">
              <Alert.Heading style={{ fontSize: '1.1rem' }}>Product submitted ✓</Alert.Heading>
              <p className="mb-2">
                FakeStoreAPI returned a new product id: <strong>#{success.id}</strong> for{' '}
                <em>{success.title}</em>.
              </p>
              <p className="mb-3" style={{ fontSize: '0.9rem' }}>
                <strong>Important:</strong> FakeStoreAPI is a mock backend. The POST request
                succeeded and returned this id, but the product is <strong>not persisted</strong> —
                it will not appear in the product list and you cannot fetch it back by id.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/products" className="btn btn-brand btn-sm">
                  Back to listing
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-brand btn-sm"
                  onClick={() => setSuccess(null)}
                >
                  Add another product
                </button>
              </div>
            </Alert>
          ) : (
            <div className="form-card">
              <ProductForm
                onSubmit={handleSubmit}
                submitting={submitting}
                submitLabel="Submit product"
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
