import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, BookOpen, Calendar, ArrowRight } from "lucide-react";
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

const steps = [
  {
    step: 1,
    title: "Browse & Discover",
    description: "Explore local farms and fresh produce in your area",
    icon: "🔍"
  },
  {
    step: 2,
    title: "Connect & Order", 
    description: "Connect directly with farmers and place your order",
    icon: "🛒"
  },
  {
    step: 3,
    title: "Fresh Delivery",
    description: "Receive farm-fresh produce at your doorstep",
    icon: "🚚"
  }
];

const benefits = [
  {
    title: "For Customers",
    items: [
      "Access to freshest organic produce",
      "Direct connection with local farmers", 
      "Transparent pricing with no middlemen",
      "Farm visits and authentic experiences",
      "Knowledge about farming practices"
    ]
  },
  {
    title: "For Farmers",
    items: [
      "Direct access to customers",
      "Fair pricing for their produce",
      "Reduced dependency on middlemen",
      "Technology tools for farm management",
      "Marketing and sales support"
    ]
  },
  {
    title: "For Delivery Partners",
    items: [
      "Flexible earning opportunities",
      "Route optimization technology",
      "Weekly payment settlements",
      "Comprehensive insurance coverage",
      "Growth and training programs"
    ]
  }
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="mr-2 h-4 w-4" />
            {t("nav.how_it_works")}
          </Badge>
          <h1 className="text-4xl font-bold mb-6">{t("how_it_works")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("how_steps_desc")}
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative">
                <CardHeader>
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Process</h2>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">1</span>
                  {t("step.discover")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Browse Local Farms</h4>
                    <p className="text-muted-foreground mb-4">
                      Use our platform to explore verified farms in your area. Each farm profile includes 
                      detailed information about their farming practices, certifications, and available produce.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• View farm locations and distance</li>
                      <li>• Read farmer profiles and stories</li>
                      <li>• Check organic certifications</li>
                      <li>• See customer reviews and ratings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Seasonal Produce</h4>
                    <p className="text-muted-foreground mb-4">
                      Discover what's fresh and in season. Our platform highlights seasonal produce 
                      to ensure you get the best quality and taste.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Seasonal availability calendar</li>
                      <li>• Nutritional information</li>
                      <li>• Recipe suggestions</li>
                      <li>• Storage and usage tips</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">2</span>
                  {t("step.order")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Place Your Order</h4>
                    <p className="text-muted-foreground mb-4">
                      Add products to your cart and choose your preferred delivery option. 
                      You can opt for home delivery or pickup directly from the farm.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Flexible quantity options</li>
                      <li>• Multiple payment methods</li>
                      <li>• Subscription options available</li>
                      <li>• Special bulk discounts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Farm Experiences</h4>
                    <p className="text-muted-foreground mb-4">
                      Book farm visits, workshops, and educational tours to learn about 
                      sustainable farming practices firsthand.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Guided farm tours</li>
                      <li>• Organic farming workshops</li>
                      <li>• Family-friendly activities</li>
                      <li>• Educational programs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">3</span>
                  {t("step.enjoy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Fresh Delivery</h4>
                    <p className="text-muted-foreground mb-4">
                      Receive your fresh produce at your doorstep or pick it up directly from the farm. 
                      All deliveries are tracked and insured.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Real-time delivery tracking</li>
                      <li>• Cold chain logistics</li>
                      <li>• Quality guarantee</li>
                      <li>• Contactless delivery option</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Community Connection</h4>
                    <p className="text-muted-foreground mb-4">
                      Join our community of conscious consumers and share your experiences, 
                      recipes, and tips with other members.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Rate and review products</li>
                      <li>• Share recipes and tips</li>
                      <li>• Connect with farmers</li>
                      <li>• Earn loyalty rewards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits for Everyone</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                Join thousands of customers enjoying farm-fresh produce
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/products')} className="w-full">
                {t("order_fresh_produce")}
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle>Want to Join as a Partner?</CardTitle>
              <CardDescription>
                Become a farmer or delivery partner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" onClick={() => navigate('/farmer-signup')} className="w-full">
                  Join as Farmer
                </Button>
                <Button variant="outline" onClick={() => navigate('/delivery-signup')} className="w-full">
                  Join as Delivery Partner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
