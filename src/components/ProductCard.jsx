import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">${Number(product.price).toFixed(2)}</div>
        <div className="mt-auto">
          <Button
            as={Link}
            to={`/products/${product.id}`}
            className="btn-brand w-100"
            size="sm"
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}
