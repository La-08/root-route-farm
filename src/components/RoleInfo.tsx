import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getDashboardPath } from '@/components/ProtectedRoute';
import { User, LayoutDashboard } from 'lucide-react';

export const RoleInfo: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Not Logged In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please log in to access role-based features.</p>
        </CardContent>
      </Card>
    );
  }

  const dashboardPath = getDashboardPath(user.role);
  const roleBenefits = {
    farmer: [
      'Add and manage products',
      'Track inventory and stock levels',
      'View and manage orders',
      'Create farm experiences',
      'Monitor sales analytics'
    ],
    delivery: [
      'View available delivery requests',
      'Manage pickup and delivery routes',
      'Track delivery status',
      'Monitor earnings and ratings',
      'Update delivery status'
    ],
    admin: [
      'Manage platform users',
      'Monitor system analytics',
      'Handle verification requests',
      'Oversee platform operations',
      'Generate reports'
    ],
    customer: [
      'Browse farms and products',
      'Place orders from farmers',
      'Book farm experiences',
      'Track order status',
      'Leave reviews and ratings'
    ]
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Role Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <strong>Role:</strong> 
              <Badge variant="outline" className="capitalize">{user.role}</Badge>
              {user.verified && <Badge variant="success">Verified</Badge>}
            </div>
          </div>
        </div>
        
        {user.role !== 'customer' && (
          <div>
            <Button 
              onClick={() => navigate(dashboardPath)}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to {user.role} Dashboard
            </Button>
          </div>
        )}

        <div>
          <h4 className="font-semibold mb-2">What you can do as a {user.role}:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {roleBenefits[user.role]?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
