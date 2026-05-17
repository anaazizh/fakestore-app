import { Alert, Button } from 'react-bootstrap';

export default function ErrorAlert({ message = 'Something went wrong.', onRetry }) {
  return (
    <Alert variant="danger" className="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <span>{message}</span>
      {onRetry && (
        <Button size="sm" variant="outline-danger" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Alert>
  );
}
