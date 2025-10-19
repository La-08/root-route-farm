import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  DollarSign,
  Navigation,
  Phone,
  CheckCircle,
  AlertCircle,
  Route,
  Calendar,
  Star
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Mock data for delivery partner dashboard
const mockStats = {
  totalDeliveries: 234,
  completedToday: 8,
  pendingPickups: 3,
  earnings: 15000,
  rating: 4.8,
  onTime: 95
};

const mockDeliveries = [
  {
    id: 'DEL-001',
    orderId: 'ORD-1001',
    customer: 'John Doe',
    farmer: 'Green Valley Farm',
    pickup: 'Pune, Maharashtra',
    delivery: 'Mumbai, Maharashtra',
    distance: '150 km',
    amount: 750,
    commission: 75,
    status: 'pending_pickup',
    scheduledTime: '10:00 AM',
    items: 'Organic Vegetables (5kg)',
    customerPhone: '+91 98765 43210'
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-1002',
    customer: 'Sarah Wilson',
    farmer: 'Fresh Fields',
    pickup: 'Pune, Maharashtra',
    delivery: 'Pune, Maharashtra',
    distance: '25 km',
    amount: 450,
    commission: 45,
    status: 'in_transit',
    scheduledTime: '2:00 PM',
    items: 'Fresh Fruits (3kg)',
    customerPhone: '+91 98765 43211'
  },
  {
    id: 'DEL-003',
    orderId: 'ORD-1003',
    customer: 'Mike Johnson',
    farmer: 'Organic Paradise',
    pickup: 'Pune, Maharashtra',
    delivery: 'Nashik, Maharashtra',
    distance: '75 km',
    amount: 320,
    commission: 32,
    status: 'delivered',
    completedTime: '11:30 AM',
    items: 'Dairy Products',
    customerPhone: '+91 98765 43212',
    rating: 5
  }
];

const mockEarnings = [
  { date: '2024-10-16', deliveries: 8, earnings: 520 },
  { date: '2024-10-15', deliveries: 6, earnings: 390 },
  { date: '2024-10-14', deliveries: 7, earnings: 455 },
  { date: '2024-10-13', deliveries: 5, earnings: 325 },
  { date: '2024-10-12', deliveries: 9, earnings: 585 }
];

export default function DeliveryDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not a delivery partner
  if (!user || user.role !== 'delivery') {
    return <Navigate to="/account" replace />;
  }

  const handleUpdateStatus = (deliveryId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log('Updating delivery status:', deliveryId, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_pickup': return 'warning';
      case 'in_transit': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_pickup': return 'Pending Pickup';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getNextAction = (status: string) => {
    switch (status) {
      case 'pending_pickup': return 'Mark as Picked Up';
      case 'in_transit': return 'Mark as Delivered';
      default: return null;
    }
  };

  const getNextStatus = (status: string) => {
    switch (status) {
      case 'pending_pickup': return 'in_transit';
      case 'in_transit': return 'delivered';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Delivery Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deliveries">Active Deliveries</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Today's Deliveries</p>
                      <p className="text-2xl font-bold">{mockStats.completedToday}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Pickups</p>
                      <p className="text-2xl font-bold">{mockStats.pendingPickups}</p>
                    </div>
                    <Clock className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold">₹{mockStats.earnings.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rating</p>
                      <p className="text-2xl font-bold">{mockStats.rating}</p>
                      <p className="text-xs text-muted-foreground">{mockStats.onTime}% on-time</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your delivery assignments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDeliveries.filter(d => d.status !== 'delivered').map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(delivery.status) as any}>
                            {getStatusText(delivery.status)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {delivery.scheduledTime}
                          </span>
                        </div>
                        <span className="font-medium">₹{delivery.commission} commission</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>Pickup: {delivery.pickup}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <MapPin className="h-4 w-4 text-red-600" />
                            <span>Delivery: {delivery.delivery}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm"><strong>Customer:</strong> {delivery.customer}</p>
                          <p className="text-sm"><strong>Items:</strong> {delivery.items}</p>
                          <p className="text-sm"><strong>Distance:</strong> {delivery.distance}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Button>
                        <Button variant="outline" size="sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                        {getNextAction(delivery.status) && (
                          <Button 
                            size="sm" 
                            onClick={() => handleUpdateStatus(delivery.id, getNextStatus(delivery.status))}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {getNextAction(delivery.status)}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Deliveries Tab */}
          <TabsContent value="deliveries" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Deliveries</h2>
              <Button variant="outline">
                <Route className="h-4 w-4 mr-2" />
                Optimize Route
              </Button>
            </div>

            <div className="space-y-4">
              {mockDeliveries.filter(d => d.status !== 'delivered').map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Delivery #{delivery.id}</h3>
                        <p className="text-sm text-muted-foreground">Order: {delivery.orderId}</p>
                      </div>
                      <Badge variant={getStatusColor(delivery.status) as any}>
                        {getStatusText(delivery.status)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Route</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>{delivery.pickup}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-red-600" />
                            <span>{delivery.delivery}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{delivery.distance}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Customer Details</h4>
                        <p className="text-sm">{delivery.customer}</p>
                        <p className="text-sm text-muted-foreground">{delivery.customerPhone}</p>
                        <p className="text-sm">{delivery.items}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Payment</h4>
                        <p className="text-sm">Order Value: ₹{delivery.amount}</p>
                        <p className="text-sm">Your Commission: ₹{delivery.commission}</p>
                        <p className="text-sm text-muted-foreground">
                          Scheduled: {delivery.scheduledTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      {getNextAction(delivery.status) && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateStatus(delivery.id, getNextStatus(delivery.status))}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {getNextAction(delivery.status)}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Report Issue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold">Delivery History</h2>
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delivery ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell>{delivery.id}</TableCell>
                        <TableCell>{delivery.customer}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{delivery.pickup} →</div>
                            <div>{delivery.delivery}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(delivery.status) as any}>
                            {getStatusText(delivery.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{delivery.commission}</TableCell>
                        <TableCell>
                          {delivery.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              {delivery.rating}
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          {delivery.completedTime || delivery.scheduledTime}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Earnings</h2>
              <Button variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-3xl font-bold">₹{mockStats.earnings.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Total Deliveries</p>
                    <p className="text-3xl font-bold">{mockStats.totalDeliveries}</p>
                    <p className="text-sm text-muted-foreground">All time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground">Avg per Delivery</p>
                    <p className="text-3xl font-bold">₹{Math.round(mockStats.earnings / mockStats.completedToday)}</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Daily Earnings</CardTitle>
                <CardDescription>Your earnings breakdown for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEarnings.map((day) => (
                    <div key={day.date} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{day.date}</p>
                        <p className="text-sm text-muted-foreground">{day.deliveries} deliveries</p>
                      </div>
                      <p className="text-lg font-bold">₹{day.earnings}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Delivery Partner Profile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p>{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vehicle Type</label>
                    <p>Motorcycle</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Service Area</label>
                    <p>Pune & Mumbai Metropolitan Area</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{mockStats.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>On-time Delivery</span>
                    <span className="font-medium">{mockStats.onTime}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Deliveries</span>
                    <span className="font-medium">{mockStats.totalDeliveries}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Member Since</span>
                    <span className="font-medium">March 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
