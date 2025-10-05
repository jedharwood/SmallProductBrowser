import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

function App() {
  return (
    <ShoppingCartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ShoppingCartProvider>
  );
}

export default App;
