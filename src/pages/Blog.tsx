import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Share2, Search, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

const getBlogPosts = (t: (key: string) => string) => [
  {
    id: 1,
    title: "Organic Farming: A Sustainable Future",
    excerpt: "Discover how organic farming practices are transforming agriculture and creating a sustainable future for generations to come.",
    content: "Organic farming represents more than just avoiding chemicals...",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    category: "Sustainable Agriculture",
    tags: ["organic", "sustainability", "farming"],
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "Seasonal Eating: Winter Vegetables Guide",
    excerpt: "Learn about the best winter vegetables to grow and consume for optimal health and environmental benefits.",
    content: "Winter brings a bounty of nutritious vegetables...",
    author: "Chef Ravi Kumar",
    date: "2024-01-10",
    category: "Seasonal Tips",
    tags: ["winter", "vegetables", "seasonal"],
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 3,
    title: "Technology in Modern Farming",
    excerpt: "How IoT, AI, and precision agriculture are revolutionizing farming practices for better yields and sustainability.",
    content: "Modern technology is transforming agriculture...",
    author: "Tech Team",
    date: "2024-01-08",
    category: "Technology",
    tags: ["technology", "IoT", "precision-farming"],
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 4,
    title: "Farm-to-Table Success Stories",
    excerpt: "Meet the farmers who have transformed their lives through direct-to-consumer sales and sustainable practices.",
    content: "Success stories from our farming community...",
    author: "Community Team",
    date: "2024-01-05",
    category: "Success Stories",
    tags: ["farmers", "success", "community"],
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 5,
    title: "Water Conservation in Agriculture",
    excerpt: "Innovative irrigation techniques and water management strategies for sustainable farming.",
    content: "Water is precious, especially in agriculture...",
    author: "Dr. Anita Patel",
    date: "2024-01-03",
    category: "Water Management",
    tags: ["water", "conservation", "irrigation"],
    image: "/api/placeholder/400/250",
    featured: false
  },
  {
    id: 6,
    title: "Building Soil Health Naturally",
    excerpt: "Understanding soil microbiomes and natural methods to improve soil fertility and crop yields.",
    content: "Healthy soil is the foundation of sustainable agriculture...",
    author: "Soil Scientist",
    date: "2024-01-01",
    category: "Soil Health",
    tags: ["soil", "microbiome", "fertility"],
    image: "/api/placeholder/400/250",
    featured: false
  }
];

const getCategories = (t: (key: string) => string) => [
  "All Posts",
  "Sustainable Agriculture", 
  "Seasonal Tips",
  "Technology",
  "Success Stories",
  "Water Management",
  "Soil Health"
];

export default function Blog() {
  const navigate = useNavigate();
  const t = useTranslations();
  const blogPosts = getBlogPosts(t);
  const categories = getCategories(t);
  
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReadMore = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("blog.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
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

        {/* Featured Posts */}
        {selectedCategory === "All Posts" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("blog.featured")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <CardTitle className="hover:text-primary cursor-pointer" onClick={() => handleReadMore(post.id)}>
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" onClick={() => handleReadMore(post.id)}>
                        {t("blog.read_more")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === "All Posts" ? t("blog.latest") : selectedCategory}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video bg-muted"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg hover:text-primary cursor-pointer" onClick={() => handleReadMore(post.id)}>
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReadMore(post.id)}
                    >
                      {t("blog.read_more")}
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>{t("newsletter")}</CardTitle>
            <CardDescription>
              {t("get_updates")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder={t("contact.email")} className="flex-1" />
              <Button>{t("subscribe")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
