import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute, RoleBasedRedirect } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Products from "./pages/Products";
import Experiences from "./pages/Experiences";
import FarmProfile from "./pages/FarmProfile";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public routes for customers and guests */}
            <Route path="/" element={
              <RoleBasedRedirect>
                <Home />
              </RoleBasedRedirect>
            } />
            <Route path="/discover" element={<Discover />} />
            <Route path="/products" element={<Products />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/farm/:id" element={<FarmProfile />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* Protected routes that require authentication */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            
            {/* Role-specific dashboard routes */}
            <Route path="/farmer/dashboard" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/delivery/dashboard" element={
              <ProtectedRoute allowedRoles={['delivery']}>
                <DeliveryDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
