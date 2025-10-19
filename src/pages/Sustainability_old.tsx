import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Droplets, Recycle, Users, Award, TreePine } from "lucide-react";

const sustainabilityStats = [
  {
    icon: Leaf,
    title: "Carbon Neutral Deliveries",
    value: "85%",
    description: "of our deliveries use electric or eco-friendly vehicles",
    progress: 85
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    value: "40%",
    description: "reduction in water usage through efficient farming",
    progress: 40
  },
  {
    icon: Recycle,
    title: "Waste Reduction",
    value: "60%",
    description: "less packaging waste with reusable containers",
    progress: 60
  },
  {
    icon: Users,
    title: "Farmer Welfare",
    value: "500+",
    description: "farmers supported with fair trade practices",
    progress: 100
  }
];

const certifications = [
  {
    name: "Organic Certification",
    body: "India Organic Certification Agency",
    badge: "🌿 IOCA Certified"
  },
  {
    name: "Fair Trade Certified",
    body: "Fair Trade Foundation India",
    badge: "🤝 Fair Trade"
  },
  {
    name: "Carbon Neutral",
    body: "Green Business Certification",
    badge: "🌍 Carbon Neutral"
  },
  {
    name: "Sustainable Agriculture",
    body: "Sustainable Agriculture Network",
    badge: "🌱 SAN Approved"
  }
];

const initiatives = [
  {
    title: "Regenerative Farming",
    description: "Supporting farmers in adopting regenerative agriculture practices that restore soil health and biodiversity.",
    impact: "200+ farms converted to regenerative practices"
  },
  {
    title: "Zero Waste Packaging", 
    description: "Implementing returnable and biodegradable packaging solutions to minimize environmental impact.",
    impact: "70% reduction in packaging waste"
  },
  {
    title: "Solar Powered Facilities",
    description: "Our warehouses and processing facilities run on renewable solar energy.",
    impact: "100% renewable energy for operations"
  },
  {
    title: "Water Conservation",
    description: "Installing drip irrigation and rainwater harvesting systems across partner farms.",
    impact: "40% water savings across partner farms"
  },
  {
    title: "Farmer Education",
    description: "Training programs on sustainable farming, organic practices, and modern technology.",
    impact: "1000+ farmers trained annually"
  },
  {
    title: "Community Development",
    description: "Building schools, healthcare facilities, and infrastructure in farming communities.",
    impact: "15 communities supported"
  }
];

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Leaf className="mr-2 h-4 w-4" />
            Sustainability
          </Badge>
          <h1 className="font-display text-4xl font-bold mb-4">
            Building a Sustainable Future
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Roots & Routes, we're committed to creating a sustainable ecosystem that benefits farmers, 
            customers, and the environment. Our mission is to promote regenerative agriculture while 
            ensuring fair trade and environmental responsibility.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sustainabilityStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">{stat.value}</span>
                </div>
                <h3 className="font-semibold mb-2">{stat.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{stat.description}</p>
                <Progress value={stat.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              Our Certifications
            </CardTitle>
            <CardDescription>
              We maintain the highest standards of sustainability and ethical practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="text-2xl mb-2">{cert.badge}</div>
                  <h4 className="font-semibold mb-1">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Initiatives */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold mb-4">Our Sustainability Initiatives</h2>
            <p className="text-lg text-muted-foreground">
              Concrete actions we're taking to create positive environmental and social impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{initiative.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{initiative.description}</p>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Impact: {initiative.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-6 w-6" />
              Our 2025 Goals
            </CardTitle>
            <CardDescription>
              Ambitious targets we're working towards for a more sustainable future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Carbon Neutral Operations</span>
                    <span className="text-sm text-muted-foreground">85% → 100%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Farmers Using Renewable Energy</span>
                    <span className="text-sm text-muted-foreground">30% → 75%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Zero Waste Packaging</span>
                    <span className="text-sm text-muted-foreground">60% → 95%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Water Conservation</span>
                    <span className="text-sm text-muted-foreground">40% → 65%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Regenerative Farms</span>
                    <span className="text-sm text-muted-foreground">200 → 500</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Community Projects</span>
                    <span className="text-sm text-muted-foreground">15 → 50</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
