import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Package, 
  Truck, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Bell,
  DollarSign,
  Star,
  Activity,
  UserCheck,
  UserX,
  ShoppingCart,
  Calendar,
  MapPin,
  Phone,
  Mail
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

// Mock admin dashboard data
const mockPlatformStats = {
  totalUsers: 2847,
  totalFarmers: 156,
  totalDeliveryPartners: 89,
  totalOrders: 5632,
  totalRevenue: 2456000,
  monthlyGrowth: 15.2,
  activeOrders: 234,
  completedOrders: 5398,
  platformCommission: 245600,
  averageOrderValue: 436
};

const mockRecentUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "customer",
    status: "active",
    joinDate: "2024-01-15",
    orders: 12,
    totalSpent: 5400
  },
  {
    id: 2,
    name: "Ramesh Kumar",
    email: "ramesh@farmexample.com",
    role: "farmer",
    status: "active",
    joinDate: "2024-01-10",
    orders: 0,
    totalSpent: 0,
    farmName: "Green Valley Farm"
  },
  {
    id: 3,
    name: "Anita Singh",
    email: "anita@delivery.com",
    role: "delivery",
    status: "active",
    joinDate: "2024-01-12",
    orders: 89,
    totalSpent: 0,
    deliveriesCompleted: 89
  },
  {
    id: 4,
    name: "Ravi Patel",
    email: "ravi@example.com",
    role: "customer",
    status: "suspended",
    joinDate: "2024-01-08",
    orders: 3,
    totalSpent: 850
  }
];

const mockFarmers = [
  {
    id: 1,
    name: "Ramesh Kumar",
    farmName: "Green Valley Organic Farm",
    location: "Pune, Maharashtra",
    status: "verified",
    rating: 4.8,
    totalProducts: 18,
    totalOrders: 145,
    revenue: 125000,
    joinDate: "2023-06-15",
    phone: "+91 98765 43210",
    email: "ramesh@greenvalley.com"
  },
  {
    id: 2,
    name: "Sunita Devi",
    farmName: "Sunrise Organic Farm",
    location: "Jaipur, Rajasthan",
    status: "pending",
    rating: 4.6,
    totalProducts: 12,
    totalOrders: 89,
    revenue: 78000,
    joinDate: "2024-01-10",
    phone: "+91 87654 32109",
    email: "sunita@sunrise.com"
  },
  {
    id: 3,
    name: "Manoj Singh",
    farmName: "Hill Station Fresh",
    location: "Shimla, Himachal Pradesh",
    status: "verified",
    rating: 4.9,
    totalProducts: 25,
    totalOrders: 203,
    revenue: 185000,
    joinDate: "2023-03-20",
    phone: "+91 76543 21098",
    email: "manoj@hillstation.com"
  }
];

const mockDeliveryPartners = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    email: "ravi@delivery.com",
    status: "active",
    rating: 4.7,
    totalDeliveries: 245,
    onTimePercentage: 92,
    location: "Pune Zone",
    vehicleType: "Bike",
    joinDate: "2023-08-15"
  },
  {
    id: 2,
    name: "Anita Singh",
    phone: "+91 87654 32109",
    email: "anita@delivery.com",
    status: "active",
    rating: 4.8,
    totalDeliveries: 189,
    onTimePercentage: 95,
    location: "Mumbai Zone",
    vehicleType: "Van",
    joinDate: "2023-09-20"
  },
  {
    id: 3,
    name: "Suresh Patel",
    phone: "+91 76543 21098",
    email: "suresh@delivery.com",
    status: "inactive",
    rating: 4.4,
    totalDeliveries: 156,
    onTimePercentage: 87,
    location: "Delhi Zone",
    vehicleType: "Bike",
    joinDate: "2023-07-10"
  }
];

const mockSystemIssues = [
  {
    id: 1,
    type: "critical",
    title: "Payment Gateway Timeout",
    description: "Multiple users reporting payment failures",
    reportedBy: "System Monitor",
    status: "investigating",
    priority: "high",
    reportedAt: "2024-01-15 10:30"
  },
  {
    id: 2,
    type: "warning",
    title: "High Server Load",
    description: "Server response time above threshold",
    reportedBy: "Auto Monitor",
    status: "monitoring",
    priority: "medium",
    reportedAt: "2024-01-15 09:45"
  },
  {
    id: 3,
    type: "info",
    title: "Database Backup Completed",
    description: "Daily backup completed successfully",
    reportedBy: "System",
    status: "resolved",
    priority: "low",
    reportedAt: "2024-01-15 06:00"
  }
];

export default function AdminDashboard() {
  const t = useTranslations();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'verified': case 'resolved': return 'bg-green-100 text-green-800';
      case 'pending': case 'investigating': case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': case 'inactive': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = mockRecentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('admin_dashboard')}</h1>
            <p className="text-muted-foreground">
              {t('platform_management')} • {t('welcome_back')}, {user.name || 'Admin'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t('export_data')}
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('refresh')}
            </Button>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              {t('alerts')} (3)
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('total_users')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPlatformStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{mockPlatformStats.monthlyGrowth}%</span> {t('from_last_month')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('platform_revenue')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{mockPlatformStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">₹{mockPlatformStats.platformCommission.toLocaleString()}</span> {t('commission')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('total_orders')}</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPlatformStats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">{mockPlatformStats.activeOrders}</span> {t('active_orders')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('avg_order_value')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{mockPlatformStats.averageOrderValue}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> {t('from_last_month')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* System Health Alert */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800">{t('system_alerts')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div>
                  <p className="font-medium text-sm">Payment Gateway</p>
                  <p className="text-xs text-muted-foreground">Response time high</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div>
                  <p className="font-medium text-sm">Server Load</p>
                  <p className="text-xs text-muted-foreground">85% capacity</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <p className="font-medium text-sm">Database</p>
                  <p className="text-xs text-muted-foreground">Healthy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="users">{t('users')}</TabsTrigger>
            <TabsTrigger value="farmers">{t('farmers')}</TabsTrigger>
            <TabsTrigger value="delivery">{t('delivery_partners')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
            <TabsTrigger value="system">{t('system')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {t('platform_performance')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('order_completion_rate')}</span>
                        <span className="text-sm font-bold">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('customer_satisfaction')}</span>
                        <span className="text-sm font-bold">4.7/5</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('farmer_retention')}</span>
                        <span className="text-sm font-bold">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('delivery_success')}</span>
                        <span className="text-sm font-bold">93%</span>
                      </div>
                      <Progress value={93} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    {t('recent_activity')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">New farmer verified</p>
                        <p className="text-xs text-muted-foreground">Sunita Devi - Sunrise Organic Farm</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Payment issue reported</p>
                        <p className="text-xs text-muted-foreground">Multiple gateway timeouts</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Revenue milestone</p>
                        <p className="text-xs text-muted-foreground">Monthly revenue crossed ₹50L</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t('user_growth_overview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{mockPlatformStats.totalUsers.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">{t('total_customers')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{mockPlatformStats.totalFarmers}</div>
                    <p className="text-sm text-muted-foreground">{t('verified_farmers')}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{mockPlatformStats.totalDeliveryPartners}</div>
                    <p className="text-sm text-muted-foreground">{t('delivery_partners')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('search_users')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_roles')}</SelectItem>
                    <SelectItem value="customer">{t('customers')}</SelectItem>
                    <SelectItem value="farmer">{t('farmers')}</SelectItem>
                    <SelectItem value="delivery">{t('delivery')}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_status')}</SelectItem>
                    <SelectItem value="active">{t('active')}</SelectItem>
                    <SelectItem value="suspended">{t('suspended')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('user')}</TableHead>
                      <TableHead>{t('role')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('join_date')}</TableHead>
                      <TableHead>{t('activity')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          {user.role === 'customer' && (
                            <div className="text-sm">
                              <p>{user.orders} orders</p>
                              <p className="text-muted-foreground">₹{user.totalSpent}</p>
                            </div>
                          )}
                          {user.role === 'farmer' && (
                            <div className="text-sm">
                              <p>{user.farmName}</p>
                            </div>
                          )}
                          {user.role === 'delivery' && (
                            <div className="text-sm">
                              <p>{user.deliveriesCompleted} deliveries</p>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {user.status === 'active' ? (
                              <Button variant="outline" size="sm">
                                <UserX className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Farmers Tab */}
          <TabsContent value="farmers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('farmer_management')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('farmer_details')}</TableHead>
                      <TableHead>{t('farm_info')}</TableHead>
                      <TableHead>{t('performance')}</TableHead>
                      <TableHead>{t('revenue')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFarmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{farmer.name}</p>
                            <p className="text-sm text-muted-foreground">{farmer.email}</p>
                            <p className="text-sm text-muted-foreground">{farmer.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{farmer.farmName}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {farmer.location}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {t('member_since')} {farmer.joinDate}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{farmer.rating}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {farmer.totalProducts} products
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {farmer.totalOrders} orders
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold">₹{farmer.revenue.toLocaleString()}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(farmer.status)}>
                            {farmer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {farmer.status === 'pending' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Partners Tab */}
          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {t('delivery_partner_management')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('partner_details')}</TableHead>
                      <TableHead>{t('service_area')}</TableHead>
                      <TableHead>{t('performance')}</TableHead>
                      <TableHead>{t('rating')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDeliveryPartners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{partner.name}</p>
                            <p className="text-sm text-muted-foreground">{partner.email}</p>
                            <p className="text-sm text-muted-foreground">{partner.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{partner.location}</p>
                            <p className="text-sm text-muted-foreground">
                              {partner.vehicleType}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t('joined')} {partner.joinDate}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {partner.totalDeliveries} deliveries
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {partner.onTimePercentage}% on-time
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{partner.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(partner.status)}>
                            {partner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('revenue_analytics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">₹{mockPlatformStats.totalRevenue.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">{t('total_platform_revenue')}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{t('commission_earnings')}</span>
                        <span className="font-medium">₹{mockPlatformStats.platformCommission.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">{t('farmer_earnings')}</span>
                        <span className="font-medium">₹{(mockPlatformStats.totalRevenue - mockPlatformStats.platformCommission).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('order_analytics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{mockPlatformStats.totalOrders.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">{t('total_orders_processed')}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">{t('completed_orders')}</span>
                        <span className="font-medium">{mockPlatformStats.completedOrders.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">{t('active_orders')}</span>
                        <span className="font-medium">{mockPlatformStats.activeOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">{t('avg_order_value')}</span>
                        <span className="font-medium">₹{mockPlatformStats.averageOrderValue}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('system_monitoring')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('issue_type')}</TableHead>
                      <TableHead>{t('description')}</TableHead>
                      <TableHead>{t('priority')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('reported_at')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSystemIssues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {issue.type === 'critical' && <XCircle className="h-4 w-4 text-red-600" />}
                            {issue.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                            {issue.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                            <span className="font-medium">{issue.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{issue.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {t('reported_by')} {issue.reportedBy}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(issue.priority)}>
                            {issue.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{issue.reportedAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {issue.status !== 'resolved' && (
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
