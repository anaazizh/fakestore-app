import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/fakestore';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await getProducts();
      setFeatured(products.slice(0, 4));
      setCategories([...new Set(products.map((p) => p.category))]);
    } catch (e) {
      setError('We could not load the storefront. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="page">
      <section className="hero">
        <div className="eyebrow">FakeStore Demo</div>
        <h1>A small, well-made catalog,<br />wired to the FakeStoreAPI.</h1>
        <p>
          A React + React Bootstrap reference build for Ana's assignment — browse products,
          inspect details, and exercise full CRUD against fakestoreapi.com.
        </p>
        <div className="mt-4 d-flex gap-2 flex-wrap">
          <Button as={Link} to="/products" className="btn-brand">
            Browse products
          </Button>
          <Button as={Link} to="/add-product" className="btn-outline-brand">
            Add a product
          </Button>
        </div>
      </section>

      {loading && <LoadingSpinner label="Loading featured products…" />}
      {error && <ErrorAlert message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <div className="eyebrow">Featured</div>
              <h2 className="section-title">Fresh picks from the catalog</h2>
            </div>
            <Link to="/products" style={{ color: 'var(--brand-accent)', fontWeight: 500, fontSize: '0.9rem' }}>
              View all →
            </Link>
          </div>
          <Row xs={1} sm={2} md={2} lg={4} className="g-4 mb-5">
            {featured.map((p) => (
              <Col key={p.id}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>

          {categories.length > 0 && (
            <section className="mt-4">
              <div className="eyebrow">Browse by category</div>
              <h2 className="section-title mb-3">Shop the departments</h2>
              <div>
                {categories.map((c) => (
                  <Link key={c} to="/products" className="category-chip">
                    {c}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Container>
  );
}
