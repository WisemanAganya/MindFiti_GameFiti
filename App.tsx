
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SettingsProvider } from './context/SettingsContext';
import CartDrawer from './components/CartDrawer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected route wrapper that redirects to login if not authenticated
// Protected route wrapper that redirects to login if not authenticated or not authorized
const ProtectedAdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/ms-auth-gateway" replace />;
  }

  // Allow admin role OR the specific super admin email
  if (user?.role !== 'admin' && user?.username !== 'aganyawiseman@gmail.com') {
    // Redirect unauthorized users to home
    return <Navigate to="/" replace />;
  }

  return <AdminPage />;
};

// Redirect to admin if already logged in
const LoginPageRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/ms-admin-portal" replace />;
  }

  return <LoginPage />;
};

const App = () => {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CartProvider>
          <HashRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <CartDrawer />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/track-order" element={<OrderTrackingPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                  <Route path="/ms-auth-gateway" element={<LoginPageRedirect />} />
                  <Route path="/ms-admin-portal" element={<ProtectedAdminRoute />} />
                  {/* Catch-all route for broken links */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;