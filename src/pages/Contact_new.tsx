import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
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

export default function Contact() {
  const t = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.title")}</CardTitle>
                <CardDescription>
                  {t("contact.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.name")}</Label>
                      <Input id="name" placeholder={t("contact.name")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.email")}</Label>
                      <Input id="email" type="email" placeholder={t("contact.email")} required />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("contact.phone")}</Label>
                      <Input id="phone" type="tel" placeholder={t("contact.phone")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contact.subject")}</Label>
                      <Input id="subject" placeholder={t("contact.subject")} required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea 
                      id="message" 
                      placeholder={t("contact.message")} 
                      className="min-h-[120px]" 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    {t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("contact.address")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Head Office</h4>
                  <p className="text-sm text-muted-foreground">
                    123 Farm Street, Agriculture District<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">contact@rootsandroutes.com</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <div className="text-sm">
                    <div className="font-medium">{t("contact.office_hours")}</div>
                    <div className="text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 9:00 AM - 2:00 PM<br />
                      Sun: Closed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {t("contact.emergency")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = 'tel:+919876543210'}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Hotline
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Support
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("live_chat")}
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.follow_us")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={() => window.open('https://facebook.com/rootsandroutes', '_blank')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={() => window.open('https://twitter.com/rootsandroutes', '_blank')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={() => window.open('https://instagram.com/rootsandroutes', '_blank')}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={() => window.open('https://linkedin.com/company/rootsandroutes', '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>
                Visit our office or any of our partner farms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
