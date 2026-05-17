import { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getProduct, updateProduct } from '../api/fakestore';
import ProductForm from '../components/ProductForm';
import MockNotice from '../components/MockNotice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await getProduct(id);
      if (!data || !data.id) {
        setLoadError('That product could not be found.');
      } else {
        setProduct(data);
      }
    } catch (e) {
      setLoadError('We could not load the product to edit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = await updateProduct(id, values);
      setSuccess({ id: updated?.id ?? id, title: values.title });
    } catch (e) {
      setError('Update failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="page">
      <Row className="justify-content-center">
        <Col lg={8} xl={7}>
          <div className="mb-3">
            <Link to={`/products/${id}`} style={{ color: 'var(--brand-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Back to product
            </Link>
          </div>

          <div className="mb-4">
            <div className="eyebrow">Edit product</div>
            <h1 className="section-title" style={{ fontSize: '1.85rem' }}>
              Update product #{id}
            </h1>
            <p className="text-muted mb-0">
              Existing fields are prefilled. Submitting sends a PUT request to FakeStoreAPI.
            </p>
          </div>

          <MockNotice>
            FakeStoreAPI accepts the PUT request and returns the updated payload, but the change
            is <strong>not persisted</strong>. Reloading the product will show the original data.
          </MockNotice>

          {loading && <LoadingSpinner label="Loading product…" />}
          {loadError && <ErrorAlert message={loadError} onRetry={load} />}
          {error && <ErrorAlert message={error} />}

          {success && (
            <Alert variant="success" className="mb-4">
              <Alert.Heading style={{ fontSize: '1.1rem' }}>Product updated ✓</Alert.Heading>
              <p className="mb-2">
                FakeStoreAPI accepted the PUT for product <strong>#{success.id}</strong> (
                <em>{success.title}</em>).
              </p>
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                <strong>Reminder:</strong> Updates do not persist. If you refetch this product,
                you'll see the original server-side values.
              </p>
            </Alert>
          )}

          {!loading && !loadError && product && (
            <div className="form-card">
              <ProductForm
                initialValues={product}
                onSubmit={handleSubmit}
                submitting={submitting}
                submitLabel="Save changes"
              />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
