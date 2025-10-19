import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Package, 
  Calendar, 
  TrendingUp, 
  Users, 
  MapPin, 
  Star, 
  Plus,
  Edit,
  Eye,
  BarChart3,
  Wallet,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Bell,
  Download,
  Upload,
  Filter,
  Search,
  RefreshCw
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

// Enhanced mock data
const mockFarmData = {
  name: "Green Valley Organic Farm",
  description: "A sustainable organic farm specializing in vegetables and fruits",
  location: "Pune, Maharashtra",
  established: "2015",
  certification: "Organic Certified",
  rating: 4.8,
  totalOrders: 245,
  totalRevenue: 325000,
  activeProducts: 18,
  upcomingBookings: 7,
  monthlyRevenue: [
    { month: 'Jan', revenue: 25000, orders: 42 },
    { month: 'Feb', revenue: 28000, orders: 38 },
    { month: 'Mar', revenue: 32000, orders: 45 },
    { month: 'Apr', revenue: 35000, orders: 52 },
    { month: 'May', revenue: 38000, orders: 48 },
    { month: 'Jun', revenue: 42000, orders: 55 }
  ],
  topProducts: [
    { name: 'Organic Tomatoes', sales: 850, revenue: 51000 },
    { name: 'Fresh Strawberries', sales: 420, revenue: 84000 },
    { name: 'Green Vegetables Mix', sales: 630, revenue: 50400 },
    { name: 'Seasonal Fruits', sales: 380, revenue: 76000 }
  ]
};

const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 60,
    unit: "kg",
    stock: 50,
    sold: 85,
    status: "active",
    lastUpdated: "2024-01-15",
    image: "/assets/indian-vegetables.jpg"
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    category: "Fruits",
    price: 200,
    unit: "kg",
    stock: 25,
    sold: 42,
    status: "active",
    lastUpdated: "2024-01-14",
    image: "/assets/strawberries.jpg"
  },
  {
    id: 3,
    name: "Green Vegetables Mix",
    category: "Vegetables",
    price: 80,
    unit: "kg",
    stock: 0,
    sold: 63,
    status: "out_of_stock",
    lastUpdated: "2024-01-13",
    image: "/assets/vegetables-market.jpg"
  },
  {
    id: 4,
    name: "Organic Mangoes",
    category: "Fruits",
    price: 300,
    unit: "kg",
    stock: 30,
    sold: 38,
    status: "active",
    lastUpdated: "2024-01-15",
    image: "/assets/indian-mangoes.jpg"
  }
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    items: "Organic Tomatoes (2kg), Strawberries (1kg)",
    total: 320,
    status: "pending",
    date: "2024-01-15",
    phone: "+91 98765 43210"
  },
  {
    id: "ORD-002",
    customer: "Rajesh Kumar",
    items: "Green Vegetables Mix (3kg)",
    total: 240,
    status: "processing",
    date: "2024-01-15",
    phone: "+91 87654 32109"
  },
  {
    id: "ORD-003",
    customer: "Anita Patel",
    items: "Organic Mangoes (2kg), Tomatoes (1kg)",
    total: 660,
    status: "shipped",
    date: "2024-01-14",
    phone: "+91 76543 21098"
  },
  {
    id: "ORD-004",
    customer: "Ravi Singh",
    items: "Strawberries (3kg)",
    total: 600,
    status: "delivered",
    date: "2024-01-13",
    phone: "+91 65432 10987"
  }
];

const mockExperiences = [
  {
    id: 1,
    title: "Farm Tour & Organic Cooking",
    date: "2024-01-20",
    participants: 8,
    maxCapacity: 12,
    status: "confirmed",
    revenue: 4000
  },
  {
    id: 2,
    title: "Harvest Experience",
    date: "2024-01-22",
    participants: 6,
    maxCapacity: 10,
    status: "confirmed",
    revenue: 3000
  },
  {
    id: 3,
    title: "Sustainable Farming Workshop",
    date: "2024-01-25",
    participants: 4,
    maxCapacity: 15,
    status: "pending",
    revenue: 2000
  }
];

export default function FarmerDashboard() {
  const t = useTranslations();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Redirect if not farmer
  if (!user || user.role !== 'farmer') {
    return <Navigate to="/" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('farmer_dashboard')}</h1>
            <p className="text-muted-foreground">
              {t('welcome_back')}, {user.name || 'Farmer'} • {mockFarmData.name}
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
              {t('notifications')}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('total_revenue')}</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{mockFarmData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> {t('from_last_month')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('total_orders')}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFarmData.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8</span> {t('new_orders')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('active_products')}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFarmData.activeProducts}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">2</span> {t('need_restock')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('farm_rating')}</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {mockFarmData.rating}
                <Star className="h-5 w-5 text-yellow-400 ml-1 fill-current" />
              </div>
              <p className="text-xs text-muted-foreground">
                {t('based_on')} 127 {t('reviews')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="products">{t('products')}</TabsTrigger>
            <TabsTrigger value="orders">{t('orders')}</TabsTrigger>
            <TabsTrigger value="experiences">{t('experiences')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
            <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {t('recent_orders')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.items}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{order.total}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t('top_products')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFarmData.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sales} {t('units_sold')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{product.revenue.toLocaleString()}</p>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(product.sales / 1000) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Experiences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('upcoming_experiences')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockExperiences.map((experience) => (
                    <div key={experience.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{experience.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{experience.date}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm">{experience.participants}/{experience.maxCapacity} {t('participants')}</p>
                          <Progress value={(experience.participants / experience.maxCapacity) * 100} className="w-20 h-2 mt-1" />
                        </div>
                        <Badge className={getStatusColor(experience.status)}>
                          {experience.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('search_products')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_status')}</SelectItem>
                    <SelectItem value="active">{t('active')}</SelectItem>
                    <SelectItem value="out_of_stock">{t('out_of_stock')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('add_product')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t('add_new_product')}</DialogTitle>
                    <DialogDescription>
                      {t('add_product_description')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">{t('product_name')}</Label>
                      <Input id="name" placeholder={t('enter_product_name')} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">{t('price')}</Label>
                        <Input id="price" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="unit">{t('unit')}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('select_unit')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="gram">gram</SelectItem>
                            <SelectItem value="piece">piece</SelectItem>
                            <SelectItem value="bunch">bunch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">{t('category')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('select_category')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">{t('vegetables')}</SelectItem>
                          <SelectItem value="fruits">{t('fruits')}</SelectItem>
                          <SelectItem value="grains">{t('grains')}</SelectItem>
                          <SelectItem value="dairy">{t('dairy')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="stock">{t('initial_stock')}</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="description">{t('description')}</Label>
                      <Textarea id="description" placeholder={t('product_description')} />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => setIsAddProductOpen(false)} variant="outline" className="flex-1">
                        {t('cancel')}
                      </Button>
                      <Button className="flex-1">
                        {t('add_product')}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('product')}</TableHead>
                      <TableHead>{t('category')}</TableHead>
                      <TableHead>{t('price')}</TableHead>
                      <TableHead>{t('stock')}</TableHead>
                      <TableHead>{t('sold')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {t('updated')} {product.lastUpdated}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₹{product.price}/{product.unit}</TableCell>
                        <TableCell>
                          <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                            {product.stock} {product.unit}
                          </span>
                        </TableCell>
                        <TableCell>{product.sold} {product.unit}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
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

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t('order_management')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('order_id')}</TableHead>
                      <TableHead>{t('customer')}</TableHead>
                      <TableHead>{t('items')}</TableHead>
                      <TableHead>{t('total')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('date')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-48">
                          <p className="text-sm truncate">{order.items}</p>
                        </TableCell>
                        <TableCell className="font-bold">₹{order.total}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {order.status === 'pending' && (
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('monthly_revenue')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFarmData.monthlyRevenue.map((month) => (
                      <div key={month.month} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-medium w-12">{month.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3 min-w-40">
                            <div 
                              className="bg-primary h-3 rounded-full" 
                              style={{ width: `${(month.revenue / 50000) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{month.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{month.orders} orders</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('key_metrics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('customer_satisfaction')}</span>
                        <span className="text-sm font-bold">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('order_fulfillment')}</span>
                        <span className="text-sm font-bold">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('on_time_delivery')}</span>
                        <span className="text-sm font-bold">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{t('repeat_customers')}</span>
                        <span className="text-sm font-bold">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('farm_profile')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="farmName">{t('farm_name')}</Label>
                    <Input id="farmName" defaultValue={mockFarmData.name} />
                  </div>
                  <div>
                    <Label htmlFor="farmDescription">{t('description')}</Label>
                    <Textarea id="farmDescription" defaultValue={mockFarmData.description} />
                  </div>
                  <div>
                    <Label htmlFor="location">{t('location')}</Label>
                    <Input id="location" defaultValue={mockFarmData.location} />
                  </div>
                  <div>
                    <Label htmlFor="certification">{t('certification')}</Label>
                    <Input id="certification" defaultValue={mockFarmData.certification} />
                  </div>
                  <Button>{t('save_changes')}</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('notifications_settings')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('new_orders')}</p>
                      <p className="text-sm text-muted-foreground">{t('notify_new_orders')}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('low_stock')}</p>
                      <p className="text-sm text-muted-foreground">{t('notify_low_stock')}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('customer_reviews')}</p>
                      <p className="text-sm text-muted-foreground">{t('notify_reviews')}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('experience_bookings')}</p>
                      <p className="text-sm text-muted-foreground">{t('notify_bookings')}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
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
