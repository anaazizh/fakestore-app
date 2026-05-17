import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // Display navigation toasts (e.g. after delete redirect)
  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
      // Clear state so the toast does not reappear on back/forward
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navigation />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1080 }}>
        <Toast
          onClose={() => setToast(null)}
          show={!!toast}
          delay={4000}
          autohide
          bg={toast?.kind === 'success' ? 'success' : toast?.kind === 'danger' ? 'danger' : 'dark'}
        >
          <Toast.Body className="text-white">{toast?.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
