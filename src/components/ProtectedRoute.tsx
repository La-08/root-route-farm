import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If specific roles are required and user doesn't have the right role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = getDashboardPath(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

// Helper function to get dashboard path based on role
export const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case 'farmer':
      return '/farmer/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'delivery':
      return '/delivery/dashboard';
    case 'customer':
    default:
      return '/';
  }
};

// Component to redirect authenticated users to their dashboard
export const RoleBasedRedirect: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // If user is logged in and on the home page, redirect to their dashboard
  if (user && user.role !== 'customer') {
    const dashboardPath = getDashboardPath(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};
