import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Droplets, Recycle, Users, Award, TreePine } from "lucide-react";
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

const getSustainabilityStats = (t: (key: string) => string) => [
  {
    icon: Leaf,
    title: t("sustainability.carbon_neutral"),
    value: "85%",
    description: t("sustainability.carbon_neutral_desc"),
    progress: 85
  },
  {
    icon: Droplets,
    title: t("sustainability.water_conservation"),
    value: "40%",
    description: t("sustainability.water_conservation_desc"),
    progress: 40
  },
  {
    icon: Recycle,
    title: t("sustainability.waste_reduction"),
    value: "60%",
    description: t("sustainability.waste_reduction_desc"),
    progress: 60
  },
  {
    icon: Users,
    title: t("sustainability.farmer_welfare"),
    value: "500+",
    description: t("sustainability.farmer_welfare_desc"),
    progress: 100
  }
];

const getCertifications = (t: (key: string) => string) => [
  {
    name: t("organic_certification"),
    body: "India Organic Certification Agency",
    badge: "🌿 IOCA Certified"
  },
  {
    name: t("fair_trade"),
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

const getInitiatives = (t: (key: string) => string) => [
  {
    title: t("sustainability.regenerative_farming"),
    description: t("sustainability.regenerative_farming_desc"),
    impact: "200+ farms converted to regenerative practices"
  },
  {
    title: t("sustainability.zero_waste"), 
    description: t("sustainability.zero_waste_desc"),
    impact: "70% reduction in packaging waste"
  },
  {
    title: t("sustainability.solar_powered"),
    description: t("sustainability.solar_powered_desc"),
    impact: "100% renewable energy for operations"
  },
  {
    title: t("sustainability.water_conservation"),
    description: "Installing drip irrigation and rainwater harvesting systems across partner farms.",
    impact: "40% water savings across partner farms"
  },
  {
    title: t("sustainability.education"),
    description: t("sustainability.education_desc"),
    impact: "1000+ farmers trained annually"
  },
  {
    title: t("sustainability.community_dev"),
    description: t("sustainability.community_dev_desc"),
    impact: "15 communities supported"
  }
];

export default function Sustainability() {
  const t = useTranslations();
  const sustainabilityStats = getSustainabilityStats(t);
  const certifications = getCertifications(t);
  const initiatives = getInitiatives(t);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Leaf className="mr-2 h-4 w-4" />
            {t("sustainability")}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{t("sustainability.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("sustainability.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sustainabilityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">
                    {stat.value}
                  </CardTitle>
                  <CardDescription className="font-medium">
                    {stat.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {stat.description}
                  </p>
                  <Progress value={stat.progress} className="h-2" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t("sustainability.certifications")}</h2>
            <p className="text-lg text-muted-foreground">
              Recognized by leading sustainability and organic certification bodies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-2xl mb-2">{cert.badge.split(' ')[0]}</div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {cert.body}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="text-xs">
                    {cert.badge}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Initiatives */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t("sustainability.initiatives")}</h2>
            <p className="text-lg text-muted-foreground">
              Our ongoing efforts to create a sustainable future
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-primary" />
                    {initiative.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {initiative.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {initiative.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Sustainability Journey</CardTitle>
            <CardDescription className="text-lg">
              Together, we can build a more sustainable food system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Every purchase you make supports sustainable farming practices and helps create a better future for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90">
                {t("order_fresh_produce")}
              </button>
              <button className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary/10">
                Learn More About Our Practices
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
