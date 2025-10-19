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
  CheckCircle
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

// Mock data for farmer dashboard
const mockFarmData = {
  name: "Green Valley Organic Farm",
  description: "A sustainable organic farm specializing in vegetables and fruits",
  location: "Pune, Maharashtra",
  established: "2015",
  certification: "Organic Certified",
  rating: 4.8,
  totalOrders: 145,
  totalRevenue: 125000,
  activeProducts: 12,
  upcomingBookings: 3
};

const mockProducts = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 60,
    unit: "kg",
    stock: 50,
    status: "active",
    lastUpdated: "2024-10-15"
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    category: "Fruits",
    price: 200,
    unit: "kg",
    stock: 0,
    status: "out_of_stock",
    lastUpdated: "2024-10-14"
  },
  {
    id: 3,
    name: "Organic Carrots",
    category: "Vegetables",
    price: 40,
    unit: "kg",
    stock: 5,
    status: "low_stock",
    lastUpdated: "2024-10-16"
  },
  {
    id: 4,
    name: "Fresh Spinach",
    category: "Vegetables",
    price: 30,
    unit: "bunch",
    stock: 25,
    status: "active",
    lastUpdated: "2024-10-16"
  }
];

const mockOrders = [
  {
    id: "ORD-1001",
    customer: "John Customer",
    items: "Tomatoes (5kg), Carrots (3kg)",
    amount: 450,
    status: "pending",
    date: "2024-10-16",
    deliveryDate: "2024-10-18"
  },
  {
    id: "ORD-1002",
    customer: "Sarah Wilson",
    items: "Strawberries (2kg)",
    amount: 400,
    status: "completed",
    date: "2024-10-15",
    deliveryDate: "2024-10-17"
  }
];

const mockExperiences = [
  {
    id: 1,
    title: "Farm Day Tour",
    description: "A complete tour of our organic farming practices",
    price: 500,
    duration: "4 hours",
    maxCapacity: 20,
    status: "active",
    bookings: 15
  }
];

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'kg',
    stock: '',
    description: ''
  });

  // Redirect if not a farmer
  if (!user || user.role !== 'farmer') {
    return <Navigate to="/account" replace />;
  }

  const handleAddProduct = () => {
    // In a real app, this would make an API call
    console.log('Adding product:', newProduct);
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      unit: 'kg',
      stock: '',
      description: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'out_of_stock': return 'destructive';
      case 'low_stock': return 'warning';
      case 'completed': return 'success';
      default: return 'secondary';
    }
  };

  const getLowStockProducts = () => {
    return mockProducts.filter(product => product.stock <= 10 && product.stock > 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}!</p>
              {!user.verified && (
                <div className="flex items-center gap-2 mt-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span className="text-sm text-warning-foreground">
                    Your account is pending verification. You can manage products but they won't be visible to customers until verified.
                  </span>
                </div>
              )}
              {user.verified && (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">Verified Farmer</span>
                </div>
              )}
            </div>
            <Button onClick={() => setActiveTab('profile')}>
              <Settings className="h-4 w-4 mr-2" />
              Farm Settings
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{mockFarmData.totalOrders}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">₹{mockFarmData.totalRevenue.toLocaleString()}</p>
                    </div>
                    <Wallet className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                      <p className="text-2xl font-bold">{mockFarmData.activeProducts}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
                      <p className="text-2xl font-bold">{mockFarmData.upcomingBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            {getLowStockProducts().length > 0 && (
              <Card className="border-warning">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    Low Stock Alert
                  </CardTitle>
                  <CardDescription>Products running low on inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getLowStockProducts().map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">Only {product.stock} {product.unit} left</p>
                        </div>
                        <Button size="sm" onClick={() => setActiveTab('products')}>
                          Restock
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-sm text-muted-foreground">Delivery: {order.deliveryDate}</p>
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
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Products</h2>
              <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Add a new product to your farm catalog
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input
                        id="product-name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g., Organic Tomatoes"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-category">Category</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                          <SelectItem value="grains">Grains</SelectItem>
                          <SelectItem value="herbs">Herbs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-price">Price (₹)</Label>
                        <Input
                          id="product-price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="60"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-unit">Unit</Label>
                        <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilogram</SelectItem>
                            <SelectItem value="gram">Gram</SelectItem>
                            <SelectItem value="piece">Piece</SelectItem>
                            <SelectItem value="bunch">Bunch</SelectItem>
                            <SelectItem value="liter">Liter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="product-stock">Stock Quantity</Label>
                      <Input
                        id="product-stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Describe your product..."
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {mockProducts.map((product) => (
                <Card key={product.id} className={product.stock <= 10 && product.stock > 0 ? 'border-warning/50' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          {product.stock <= 10 && product.stock > 0 && (
                            <AlertCircle className="h-4 w-4 text-warning" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-lg font-bold">₹{product.price}/{product.unit}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Stock: {product.stock} {product.unit}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Updated: {product.lastUpdated}</p>
                        </div>
                        {product.stock <= 10 && product.stock > 0 && (
                          <p className="text-sm text-warning mt-1">⚠️ Running low on stock</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getStatusColor(product.status) as any}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" title="Edit Product">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {(product.stock <= 10 || product.status === 'out_of_stock') && (
                            <Button size="sm" variant="default" title="Restock">
                              <Plus className="h-4 w-4 mr-1" />
                              Restock
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Orders Management</h2>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                        <p className="text-sm">{order.items}</p>
                        <p className="text-sm text-muted-foreground">Ordered: {order.date} | Delivery: {order.deliveryDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{order.amount}</p>
                        <Badge variant={getStatusColor(order.status) as any} className="mb-2">
                          {order.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          {order.status === 'pending' && (
                            <Button size="sm">Update Status</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Farm Experiences</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            <div className="grid gap-4">
              {mockExperiences.map((experience) => (
                <Card key={experience.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{experience.title}</h3>
                        <p className="text-sm text-muted-foreground">{experience.description}</p>
                        <p className="text-lg font-bold">₹{experience.price}/person</p>
                        <p className="text-sm">Duration: {experience.duration} | Max: {experience.maxCapacity} people</p>
                        <p className="text-sm">Current bookings: {experience.bookings}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(experience.status) as any}>
                          {experience.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Sales analytics coming soon</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Customer insights coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Farm Profile</h2>
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>Update your farm details and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="farm-name">Farm Name</Label>
                  <Input id="farm-name" value={mockFarmData.name} />
                </div>
                <div>
                  <Label htmlFor="farm-description">Description</Label>
                  <Textarea id="farm-description" value={mockFarmData.description} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farm-location">Location</Label>
                    <Input id="farm-location" value={mockFarmData.location} />
                  </div>
                  <div>
                    <Label htmlFor="farm-established">Established</Label>
                    <Input id="farm-established" value={mockFarmData.established} />
                  </div>
                </div>
                <div>
                  <Label>Certifications</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success">{mockFarmData.certification}</Badge>
                  </div>
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
