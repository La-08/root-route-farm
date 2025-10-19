import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Briefcase, Heart, Coffee, Zap, Award } from "lucide-react";
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

const openPositions = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "3-5 years",
    description: "Join our engineering team to build scalable solutions that connect farmers with consumers.",
    requirements: ["React/Node.js experience", "Cloud platform knowledge", "Agriculture tech interest"],
    posted: "2024-01-15"
  },
  {
    id: 2,
    title: "Agricultural Specialist",
    department: "Operations",
    location: "Multiple Locations",
    type: "Full-time", 
    experience: "2-4 years",
    description: "Help farmers adopt sustainable practices and improve crop yields through technology.",
    requirements: ["Agriculture degree", "Field experience", "Communication skills"],
    posted: "2024-01-12"
  },
  {
    id: 3,
    title: "Supply Chain Manager",
    department: "Logistics",
    location: "Delhi, India",
    type: "Full-time",
    experience: "4-6 years",
    description: "Optimize our cold chain logistics to ensure fresh produce delivery across India.",
    requirements: ["Supply chain experience", "Logistics background", "Process optimization"],
    posted: "2024-01-10"
  },
  {
    id: 4,
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "Mumbai, India", 
    type: "Full-time",
    experience: "3-5 years",
    description: "Drive product adoption and customer acquisition through innovative marketing strategies.",
    requirements: ["Marketing experience", "Digital marketing", "Analytics skills"],
    posted: "2024-01-08"
  },
  {
    id: 5,
    title: "Customer Success Executive",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    description: "Ensure customer satisfaction and drive retention through excellent service.",
    requirements: ["Customer service experience", "Communication skills", "Problem-solving"],
    posted: "2024-01-05"
  },
  {
    id: 6,
    title: "Data Scientist",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    experience: "2-4 years",
    description: "Use data to optimize farming practices, predict demand, and improve operations.",
    requirements: ["Python/R experience", "Machine learning", "Agriculture domain knowledge"],
    posted: "2024-01-03"
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs"
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours, remote work options, and unlimited PTO policy"
  },
  {
    icon: Zap,
    title: "Growth Opportunities",
    description: "Learning budget, conference attendance, and internal mobility programs"
  },
  {
    icon: Award,
    title: "Impact & Recognition",
    description: "Make a difference in sustainable agriculture and get recognized for your contributions"
  }
];

const values = [
  {
    title: "Sustainability First",
    description: "We're committed to building a sustainable future for agriculture and our planet."
  },
  {
    title: "Farmer Empowerment",
    description: "Everything we do is aimed at empowering farmers and improving their livelihoods."
  },
  {
    title: "Innovation & Technology",
    description: "We leverage cutting-edge technology to solve age-old agricultural challenges."
  },
  {
    title: "Transparency & Trust",
    description: "We believe in complete transparency in our operations and building trust with all stakeholders."
  }
];

export default function Careers() {
  const navigate = useNavigate();
  const t = useTranslations();

  const handleApply = (jobId: number) => {
    // In a real application, this would navigate to a job application form
    navigate(`/careers/apply/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Briefcase className="mr-2 h-4 w-4" />
            {t("careers")}
          </Badge>
          <h1 className="text-4xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us revolutionize agriculture and create a sustainable future. 
            Join a team that's passionate about connecting farmers with consumers.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.experience}
                        </span>
                      </CardDescription>
                    </div>
                    <Button onClick={() => handleApply(job.id)}>
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Posted: {new Date(job.posted).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-4">What Makes Us Different</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• <strong>Impact-driven work:</strong> Every role directly contributes to sustainable agriculture</li>
                    <li>• <strong>Learning environment:</strong> Continuous learning and skill development opportunities</li>
                    <li>• <strong>Diverse team:</strong> Backgrounds spanning technology, agriculture, business, and more</li>
                    <li>• <strong>Innovation culture:</strong> Encouraged to experiment and bring new ideas to life</li>
                    <li>• <strong>Work-life integration:</strong> Flexible schedules and remote work options</li>
                  </ul>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Team photo coming soon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hiring Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Hiring Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <CardTitle className="text-lg">Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Submit your application with resume and cover letter
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <CardTitle className="text-lg">Screening</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Initial phone/video call to discuss your background and interests
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <CardTitle className="text-lg">Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Technical and cultural fit interviews with team members
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <CardTitle className="text-lg">Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reference checks and offer negotiation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Don't See a Perfect Match?</CardTitle>
            <CardDescription className="text-lg">
              We're always looking for talented individuals to join our mission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Send us your resume and let us know how you'd like to contribute to sustainable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')}>
                Send Us Your Resume
              </Button>
              <Button variant="outline" onClick={() => navigate('/about')}>
                Learn More About Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
