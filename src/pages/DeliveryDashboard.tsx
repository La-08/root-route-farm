import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
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
  Star,
  TrendingUp,
  Filter,
  Search,
  RefreshCw,
  Bell,
  Settings,
  Eye,
  Download,
  BarChart3,
  Users,
  Activity,
  Timer,
  Fuel,
  Shield,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Helper function to get translations
const useTranslations = () => {
  const [t, setT] = useState<(key: string) => string>(() => (key: string) => key);

  useEffect(() => {
    const updateT = () => {
      setT(() => (window as any).__i18n?.t || ((key: string) => key));
    };
    
    updateT();
    window.addEventListener('langchange', updateT);
    return () => window.removeEventListener('langchange', updateT);
  }, []);

  return t;
};

// Enhanced mock data for delivery partner dashboard
const mockStats = {
  totalDeliveries: 234,
  completedToday: 8,
  pendingPickups: 3,
  earnings: 15000,
  weeklyEarnings: 3500,
  monthlyTarget: 20000,
  rating: 4.8,
  onTime: 95,
  fuelEfficiency: 85,
  customerRating: 4.9,
  completionRate: 98,
  avgDeliveryTime: 35,
  totalDistance: 2840,
  carbonSaved: 45.2
};

const mockAnalytics = {
  weeklyStats: [
    { day: 'Mon', deliveries: 12, earnings: 780, distance: 145 },
    { day: 'Tue', deliveries: 10, earnings: 650, distance: 128 },
    { day: 'Wed', deliveries: 15, earnings: 975, distance: 187 },
    { day: 'Thu', deliveries: 8, earnings: 520, distance: 98 },
    { day: 'Fri', deliveries: 14, earnings: 910, distance: 162 },
    { day: 'Sat', deliveries: 18, earnings: 1170, distance: 203 },
    { day: 'Sun', deliveries: 6, earnings: 390, distance: 89 }
  ],
  performanceMetrics: {
    efficiency: 92,
    punctuality: 96,
    customerSatisfaction: 98,
    safetyScore: 94
  },
  achievements: [
    { title: 'Top Performer', description: 'Top 10% this month', icon: Award, earned: true },
    { title: 'Speed Demon', description: '100+ fast deliveries', icon: Zap, earned: true },
    { title: 'Customer Favorite', description: '4.8+ rating', icon: Star, earned: true },
    { title: 'Eco Warrior', description: '50kg CO2 saved', icon: Shield, earned: false }
  ]
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
    estimatedTime: '2.5 hrs',
    items: 'Organic Vegetables (5kg)',
    customerPhone: '+91 98765 43210',
    priority: 'high',
    paymentMethod: 'online',
    specialInstructions: 'Handle with care - fragile items'
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
    estimatedTime: '45 mins',
    items: 'Fresh Fruits (3kg)',
    customerPhone: '+91 98765 43211',
    priority: 'medium',
    paymentMethod: 'cod',
    startTime: '2:15 PM'
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
    rating: 5,
    feedback: 'Excellent service!',
    priority: 'low',
    paymentMethod: 'online'
  },
  {
    id: 'DEL-004',
    orderId: 'ORD-1004',
    customer: 'Priya Sharma',
    farmer: 'Sunrise Organics',
    pickup: 'Pune, Maharashtra',
    delivery: 'Pune, Maharashtra',
    distance: '18 km',
    amount: 280,
    commission: 28,
    status: 'pending_pickup',
    scheduledTime: '4:00 PM',
    estimatedTime: '35 mins',
    items: 'Mixed Vegetables (2kg)',
    customerPhone: '+91 98765 43213',
    priority: 'medium',
    paymentMethod: 'online'
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
  const { addNotification } = useNotifications();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    date: 'today'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not a delivery partner
  if (!user || user.role !== 'delivery') {
    return <Navigate to="/account" replace />;
  }

  const handleUpdateStatus = (deliveryId: string, newStatus: string) => {
    // In a real app, this would make an API call
    addNotification({
      title: 'Status Updated',
      message: `Delivery ${deliveryId} marked as ${newStatus.replace('_', ' ')}`,
      type: 'success'
    });
    console.log('Updating delivery status:', deliveryId, newStatus);
  };

  const handleToggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    addNotification({
      title: isOnline ? 'Going Offline' : 'Going Online',
      message: isOnline ? 'You will not receive new delivery requests' : 'You are now available for deliveries',
      type: isOnline ? 'warning' : 'success'
    });
  };

  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || delivery.status === filters.status;
    const matchesPriority = filters.priority === 'all' || delivery.priority === filters.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                {t('delivery.dashboard.title') || 'Delivery Dashboard'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t('delivery.dashboard.welcome') || `Welcome back, ${user.name}!`}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Online Status Toggle */}
              <div className="flex items-center gap-2 p-3 bg-card rounded-lg border">
                <Activity className={`h-4 w-4 ${isOnline ? 'text-green-500' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={handleToggleOnlineStatus}
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="deliveries" className="text-xs sm:text-sm">
                <Package className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Active</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                <TrendingUp className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm">
                <Calendar className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="text-xs sm:text-sm">
                <DollarSign className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Earnings</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm">
                <Settings className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-blue-700">Today's Deliveries</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-900">{mockStats.completedToday}</p>
                      <p className="text-xs text-blue-600">+12% from yesterday</p>
                    </div>
                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-orange-700">Pending Pickups</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-900">{mockStats.pendingPickups}</p>
                      <p className="text-xs text-orange-600">Urgent: 1</p>
                    </div>
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-green-700">This Week</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-900">₹{mockStats.weeklyEarnings.toLocaleString()}</p>
                      <p className="text-xs text-green-600">Target: ₹5,000</p>
                    </div>
                    <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={(mockStats.weeklyEarnings / 5000) * 100} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-yellow-700">Rating</p>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-900">{mockStats.rating}</p>
                      <p className="text-xs text-yellow-600">{mockStats.onTime}% on-time</p>
                    </div>
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Timer className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">{mockStats.avgDeliveryTime} min</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Fuel className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                  <p className="text-2xl font-bold">{mockStats.fuelEfficiency}%</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                  <p className="text-2xl font-bold">{mockStats.carbonSaved} kg</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{mockStats.completionRate}%</p>
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

          {/* New Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">Performance Analytics</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Weekly Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Your delivery and earnings trends this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.weeklyStats.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-t from-primary to-primary-light rounded-full"></div>
                        <div>
                          <p className="font-medium">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.deliveries} deliveries</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{day.earnings}</p>
                        <p className="text-sm text-muted-foreground">{day.distance} km</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Efficiency Score</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          stroke="#10b981" 
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${mockAnalytics.performanceMetrics.efficiency * 2.51} 251`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{mockAnalytics.performanceMetrics.efficiency}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Punctuality</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          stroke="#3b82f6" 
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${mockAnalytics.performanceMetrics.punctuality * 2.51} 251`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{mockAnalytics.performanceMetrics.punctuality}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          stroke="#f59e0b" 
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${mockAnalytics.performanceMetrics.customerSatisfaction * 2.51} 251`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{mockAnalytics.performanceMetrics.customerSatisfaction}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Safety Score</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          stroke="#8b5cf6" 
                          strokeWidth="8" 
                          fill="none"
                          strokeDasharray={`${mockAnalytics.performanceMetrics.safetyScore * 2.51} 251`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{mockAnalytics.performanceMetrics.safetyScore}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <CardDescription>Your performance milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockAnalytics.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge variant="success" className="mt-2 text-xs">
                          Earned
                        </Badge>
                      )}
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
