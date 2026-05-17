import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="center-state" role="status" aria-live="polite">
      <Spinner animation="border" variant="dark" />
      <div>{label}</div>
    </div>
  );
}
