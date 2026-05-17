import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container className="page">
      <div className="center-state">
        <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>404</h1>
        <p>That page doesn't exist.</p>
        <Button as={Link} to="/" className="btn-brand">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
