import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "10 Benefits of Eating Organic Vegetables",
    excerpt: "Discover why organic vegetables are not just a trend but a lifestyle choice that benefits your health and the environment.",
    content: "Organic farming practices avoid synthetic pesticides and fertilizers, resulting in produce that's not only healthier for you but also better for the environment...",
    author: "Dr. Priya Sharma",
    date: "2024-10-15",
    readTime: "5 min read",
    category: "Health & Nutrition",
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Farming Practices for Small Farmers",
    excerpt: "Learn about sustainable farming techniques that can help small farmers increase yields while protecting the environment.",
    content: "Small-scale farming can be both profitable and sustainable. Here are proven techniques that help farmers...",
    author: "Ravi Kumar",
    date: "2024-10-12",
    readTime: "8 min read",
    category: "Sustainable Agriculture",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "From Farm to Table: Understanding Food Traceability",
    excerpt: "Why knowing where your food comes from matters and how technology is making it possible.",
    content: "Food traceability is becoming increasingly important for food safety, quality assurance, and consumer trust...",
    author: "Anita Desai",
    date: "2024-10-10",
    readTime: "6 min read",
    category: "Food Safety",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Seasonal Eating: Why It's Good for You and the Planet",
    excerpt: "Eating seasonally supports local farmers, reduces environmental impact, and provides the freshest, most nutritious produce.",
    content: "Seasonal eating aligns our diet with nature's cycles, providing numerous benefits for health and sustainability...",
    author: "Dr. Rajesh Mehta",
    date: "2024-10-08",
    readTime: "4 min read",
    category: "Nutrition",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "Technology in Modern Farming: Drones, IoT, and AI",
    excerpt: "How cutting-edge technology is revolutionizing agriculture and helping farmers increase efficiency and sustainability.",
    content: "Modern farming is embracing technology like never before. From drones monitoring crop health to AI predicting weather patterns...",
    author: "Tech Farming Team",
    date: "2024-10-05",
    readTime: "7 min read",
    category: "Agricultural Technology",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Building a Community Garden: A Beginner's Guide",
    excerpt: "Step-by-step guide to starting a community garden that brings neighborhoods together while promoting sustainable living.",
    content: "Community gardens are wonderful spaces that bring people together, provide fresh produce, and beautify neighborhoods...",
    author: "Green Community Initiative",
    date: "2024-10-02",
    readTime: "10 min read",
    category: "Community",
    image: "/api/placeholder/400/250"
  }
];

const categories = ["All", "Health & Nutrition", "Sustainable Agriculture", "Food Safety", "Nutrition", "Agricultural Technology", "Community"];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">
            Farm Fresh Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories, tips, and insights from the world of sustainable farming and fresh food.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && !searchTerm && (
          <Card className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="aspect-video bg-muted rounded-lg"></div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">Featured</Badge>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <CardTitle className="text-2xl">{featuredPost.title}</CardTitle>
                <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button className="mt-4 w-fit">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              Get the latest articles and farming insights delivered to your inbox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
