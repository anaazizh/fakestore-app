import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { getProduct, deleteProduct } from '../api/fakestore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [toast, setToast] = useState(null); // { kind: 'success'|'info'|'danger', msg }

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProduct(id);
      if (!data || !data.id) {
        setError('That product could not be found.');
      } else {
        setProduct(data);
      }
    } catch (e) {
      setError('We could not load this product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteProduct(id);
      setShowDeleteModal(false);
      setDeleting(false);
      // Pass a success flag via navigation state
      navigate('/products', {
        state: {
          toast: {
            kind: 'success',
            msg: `Product #${id} deleted (mock — FakeStoreAPI does not persist this).`,
          },
        },
      });
    } catch (e) {
      setDeleting(false);
      setDeleteError('Delete failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="page">
        <LoadingSpinner label="Loading product…" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="page">
        <ErrorAlert message={error} onRetry={load} />
        <Link to="/products">← Back to products</Link>
      </Container>
    );
  }

  if (!product) return null;

  return (
    <Container className="page">
      <div className="mb-3">
        <Link to="/products" style={{ color: 'var(--brand-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← Back to products
        </Link>
      </div>

      <Row className="g-4 g-lg-5">
        <Col lg={6}>
          <div className="detail-image-wrap">
            <img src={product.image} alt={product.title} />
          </div>
        </Col>
        <Col lg={6}>
          <div className="detail-meta">{product.category}</div>
          <h1 className="detail-title">{product.title}</h1>
          {product.rating && (
            <div className="mb-3">
              <span className="rating-pill">
                ★ {product.rating.rate} <span className="text-muted">({product.rating.count} reviews)</span>
              </span>
            </div>
          )}
          <div className="detail-price">${Number(product.price).toFixed(2)}</div>
          <p className="detail-desc">{product.description}</p>

          <div className="d-flex gap-2 flex-wrap mb-4">
            <Button
              className="btn-brand"
              onClick={() =>
                setToast({
                  kind: 'info',
                  msg: 'Added to cart (demo only — no cart persistence in this build).',
                })
              }
            >
              Add to cart
            </Button>
            <Button
              as={Link}
              to={`/edit-product/${product.id}`}
              className="btn-outline-brand"
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>

          <div className="mock-notice">
            <strong>Mock API note:</strong> Edit and Delete will hit FakeStoreAPI and return a successful
            response, but changes are not actually persisted on the server.
          </div>
        </Col>
      </Row>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => !deleting && setShowDeleteModal(false)} centered>
        <Modal.Header closeButton={!deleting}>
          <Modal.Title>Delete this product?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">
            You're about to delete <strong>{product.title}</strong>.
          </p>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            This sends a DELETE request to FakeStoreAPI. The response will succeed, but the
            product will not actually be removed from the server (mock API).
          </p>
          {deleteError && (
            <div className="mt-3">
              <ErrorAlert message={deleteError} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete product'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container for add-to-cart feedback */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1080 }}>
        <Toast
          onClose={() => setToast(null)}
          show={!!toast}
          delay={3000}
          autohide
          bg={toast?.kind === 'success' ? 'success' : toast?.kind === 'danger' ? 'danger' : 'dark'}
        >
          <Toast.Body className="text-white">{toast?.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}
