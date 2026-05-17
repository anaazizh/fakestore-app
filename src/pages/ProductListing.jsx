import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { getProducts } from '../api/fakestore';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      setError('We could not load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [products, query, category]);

  return (
    <Container className="page">
      <div className="mb-4">
        <div className="eyebrow">Catalog</div>
        <h1 className="section-title" style={{ fontSize: '2rem' }}>All products</h1>
        <p className="text-muted mb-0">
          {loading ? 'Loading…' : `${filtered.length} of ${products.length} item${products.length === 1 ? '' : 's'}`}
        </p>
      </div>

      <Row className="g-2 mb-4">
        <Col md={7}>
          <InputGroup>
            <InputGroup.Text>🔎</InputGroup.Text>
            <Form.Control
              placeholder="Search products by title…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={5}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading && <LoadingSpinner label="Loading products…" />}
      {error && <ErrorAlert message={error} onRetry={load} />}

      {!loading && !error && filtered.length === 0 && (
        <div className="center-state">
          <div>No products match your filters.</div>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filtered.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
