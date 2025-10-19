import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Eye, Award, MapPin, Calendar } from "lucide-react";
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

const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    bio: "Former agriculture scientist with 15+ years experience in sustainable farming.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Priya Sharma", 
    role: "CTO",
    bio: "Tech expert passionate about using technology to solve agricultural challenges.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Anita Patel",
    role: "Head of Operations",
    bio: "Supply chain expert ensuring fresh produce reaches customers efficiently.",
    image: "/api/placeholder/150/150"
  },
  {
    name: "Dr. Suresh Reddy",
    role: "Agricultural Advisor",
    bio: "Leading agricultural researcher and sustainable farming advocate.",
    image: "/api/placeholder/150/150"
  }
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to connect farmers directly with consumers"
  },
  {
    year: "2021", 
    title: "100+ Farmers Onboarded",
    description: "Reached our first major milestone of supporting local farmers"
  },
  {
    year: "2022",
    title: "Expansion to 5 Cities",
    description: "Extended our reach to serve more communities across India"
  },
  {
    year: "2023",
    title: "1 Million+ Orders",
    description: "Delivered fresh produce to over a million satisfied customers"
  },
  {
    year: "2024",
    title: "Sustainability Certification",
    description: "Achieved carbon-neutral operations and organic certification"
  }
];

export default function About() {
  const navigate = useNavigate();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Users className="mr-2 h-4 w-4" />
            {t("about_us")}
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("footer_about")} We're building a sustainable future where farmers thrive and customers enjoy the freshest produce.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t("mission")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower farmers with technology and connect them directly with consumers, 
                creating a sustainable and transparent food system.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t("vision")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A world where every meal is traceable to its source, farmers are fairly compensated, 
                and sustainable agriculture is the norm.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Transparency, sustainability, farmer empowerment, and customer satisfaction 
                guide everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("our_story")}</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-muted-foreground mb-4">
                Roots & Routes was born from a simple observation: there was a disconnect between farmers 
                who grow our food and the people who consume it. Traditional supply chains often meant 
                farmers received minimal compensation while consumers paid high prices for produce that 
                had traveled long distances and lost freshness.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founder, Rajesh Kumar, a former agricultural scientist, witnessed firsthand how 
                middlemen dominated the agricultural supply chain. After years of research in sustainable 
                farming practices, he decided to create a platform that would directly connect farmers 
                with consumers, ensuring fair prices and fresh produce.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to support over 500 farmers across India, deliver to thousands of 
                customers daily, and maintain our commitment to sustainability and transparency in 
                everything we do.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t("team")}</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate team behind Roots & Routes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted"></div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our mission to transform agriculture
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{milestone.year}</Badge>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Partner Farmers</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <p className="text-sm text-muted-foreground">Cities Served</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Organic Certified</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Mission</CardTitle>
            <CardDescription className="text-lg">
              Be part of the sustainable agriculture revolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/careers')}>
                {t("careers")}
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                {t("contact_us")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
