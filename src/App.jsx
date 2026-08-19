import { Button, Container } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

function HomePage() {
  return (
    <Container className="py-5 text-center">
      <h1>Welcome to FakeStore</h1>
      <p className="lead">
        Browse products and manage items using a practice e-commerce API.
      </p>
      <Button as={Link} to="/products">
        View Products
      </Button>
    </Container>
  );
}

function NotFoundPage() {
  return (
    <Container className="py-5 text-center">
      <h1>Page Not Found</h1>
      <Button as={Link} to="/" variant="primary">
        Go Home
      </Button>
    </Container>
  );
}

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
