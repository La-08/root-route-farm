import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Shield, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  X,
  Eye,
  Search,
  Filter,
  Download,
  BarChart3,
  DollarSign,
  ShoppingCart,
  UserCheck
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1250,
  totalFarmers: 89,
  pendingVerifications: 12,
  totalOrders: 3456,
  totalRevenue: 450000,
  monthlyGrowth: 12.5
};

const mockPendingFarmers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    farmName: 'Kumar Organic Farm',
    location: 'Delhi, India',
    phone: '+91 98765 43210',
    submittedDate: '2024-10-15',
    documents: ['Aadhar Card', 'Farm License', 'Organic Certificate']
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    farmName: 'Sharma Vegetables',
    location: 'Punjab, India',
    phone: '+91 98765 43211',
    submittedDate: '2024-10-14',
    documents: ['Aadhar Card', 'Farm License']
  }
];

const mockRecentOrders = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    farmer: 'Green Valley Farm',
    amount: 750,
    status: 'completed',
    date: '2024-10-16'
  },
  {
    id: 'ORD-1002',
    customer: 'Sarah Wilson',
    farmer: 'Organic Paradise',
    amount: 450,
    status: 'pending',
    date: '2024-10-16'
  }
];

const mockUsers = [
  {
    id: '1',
    name: 'John Customer',
    email: 'john@example.com',
    role: 'customer',
    status: 'active',
    joinDate: '2024-09-15',
    orders: 12
  },
  {
    id: '2',
    name: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    role: 'farmer',
    status: 'verified',
    joinDate: '2024-08-20',
    orders: 45
  }
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/account" replace />;
  }

  const handleApproveFarmer = (farmerId: string) => {
    // In a real app, this would make an API call
    console.log('Approving farmer:', farmerId);
    // Remove from pending list
  };

  const handleRejectFarmer = (farmerId: string) => {
    // In a real app, this would make an API call
    console.log('Rejecting farmer:', farmerId);
    // Remove from pending list
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'verified':
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'suspended':
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage the Roots & Routes platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{mockStats.totalUsers}</p>
                      <p className="text-xs text-green-600">+{mockStats.monthlyGrowth}% this month</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Farmers</p>
                      <p className="text-2xl font-bold">{mockStats.totalFarmers}</p>
                      <p className="text-xs text-warning">{mockStats.pendingVerifications} pending</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
                      <p className="text-xs text-green-600">Active marketplace</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Platform Revenue</p>
                      <p className="text-2xl font-bold">₹{mockStats.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600">Commission earned</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Verifications Alert */}
            {mockStats.pendingVerifications > 0 && (
              <Card className="border-warning">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="h-8 w-8 text-warning" />
                    <div>
                      <h3 className="font-semibold">Farmer Verifications Pending</h3>
                      <p className="text-sm text-muted-foreground">
                        {mockStats.pendingVerifications} farmers are waiting for verification approval
                      </p>
                    </div>
                    <Button onClick={() => setActiveTab('farmers')} className="ml-auto">
                      Review Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest marketplace activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer} → {order.farmer}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.amount}</p>
                          <Badge variant={getStatusColor(order.status) as any}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>System status and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Users (24h)</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Uptime</span>
                      <span className="font-medium text-green-600">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Support Tickets</span>
                      <span className="font-medium">5 open</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment Success Rate</span>
                      <span className="font-medium text-green-600">98.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Farmers Tab */}
          <TabsContent value="farmers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Farmer Management</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search farmers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Pending Verifications */}
            {mockPendingFarmers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Pending Verifications ({mockPendingFarmers.length})
                  </CardTitle>
                  <CardDescription>
                    Farmers waiting for account verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPendingFarmers.map((farmer) => (
                      <div key={farmer.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{farmer.name}</h3>
                            <p className="text-sm text-muted-foreground">{farmer.farmName}</p>
                            <p className="text-sm text-muted-foreground">{farmer.location}</p>
                            <p className="text-sm text-muted-foreground">Submitted: {farmer.submittedDate}</p>
                            <div className="flex gap-1 mt-2">
                              {farmer.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedFarmer(farmer)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Farmer Verification Review</DialogTitle>
                                  <DialogDescription>
                                    Review farmer details and documents for verification
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedFarmer && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Name</Label>
                                        <p>{selectedFarmer.name}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Email</Label>
                                        <p>{selectedFarmer.email}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Farm Name</Label>
                                        <p>{selectedFarmer.farmName}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Location</Label>
                                        <p>{selectedFarmer.location}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Phone</Label>
                                        <p>{selectedFarmer.phone}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Submitted</Label>
                                        <p>{selectedFarmer.submittedDate}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Documents</Label>
                                      <div className="flex gap-2 mt-2">
                                        {selectedFarmer.documents.map((doc: string, index: number) => (
                                          <Badge key={index} variant="outline">
                                            {doc}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button variant="outline" onClick={() => handleRejectFarmer(selectedFarmer.id)}>
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                      <Button onClick={() => handleApproveFarmer(selectedFarmer.id)}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" onClick={() => handleApproveFarmer(farmer.id)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleRejectFarmer(farmer.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Farmers Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Farmers</CardTitle>
                <CardDescription>Manage all registered farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Farm</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.filter(u => u.role === 'farmer').map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell>{farmer.name}</TableCell>
                        <TableCell>Farm Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(farmer.status) as any}>
                            {farmer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{farmer.joinDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status) as any}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Order management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Revenue charts coming soon</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Growth analytics coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Manage platform settings and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Settings panel coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Label component (if not already defined)
const Label = ({ children, className = "", ...props }: any) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);
