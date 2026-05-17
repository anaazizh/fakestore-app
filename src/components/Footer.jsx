import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="brand-footer">
      <Container className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>© {new Date().getFullYear()} FakeStore — Built with Vite, React Router & React Bootstrap.</div>
        <div>
          Data: <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" style={{ color: 'var(--brand-accent)' }}>FakeStoreAPI</a>
        </div>
      </Container>
    </footer>
  );
}
