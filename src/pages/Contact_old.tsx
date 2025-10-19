import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle, Users, Truck, Shield } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Headquarters",
    details: ["Roots & Routes Pvt Ltd", "123 Green Valley Business Park", "Pune, Maharashtra 411001", "India"]
  },
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+91 12345 67890", "Monday - Saturday", "9:00 AM - 8:00 PM IST"]
  },
  {
    icon: Mail,
    title: "Email Support", 
    details: ["support@rootsandroutes.com", "partnerships@rootsandroutes.com", "Response within 24 hours"]
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]
  }
];

const supportCategories = [
  {
    icon: Users,
    title: "General Support",
    description: "Questions about orders, account, or platform usage"
  },
  {
    icon: Users,
    title: "Farmer Support", 
    description: "Help with farming dashboard, product listings, and verification"
  },
  {
    icon: Truck,
    title: "Delivery Support",
    description: "Delivery partner registration, route optimization, and earnings"
  },
  {
    icon: Shield,
    title: "Technical Issues",
    description: "App bugs, website issues, or payment problems"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our platform? Need help with your order? 
            Our friendly support team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Support</SelectItem>
                          <SelectItem value="farmer">Farmer Support</SelectItem>
                          <SelectItem value="delivery">Delivery Support</SelectItem>
                          <SelectItem value="technical">Technical Issues</SelectItem>
                          <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Support Categories */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Need Quick Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportCategories.map((category, index) => (
                  <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <category.icon className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">{category.title}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <info.icon className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Live Chat Button */}
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team in real-time
                </p>
                <Button className="w-full">
                  Start Live Chat
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Available: Mon-Sat, 9 AM - 8 PM IST
                </p>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-orange-800">Emergency Support</h3>
                <p className="text-sm text-orange-700 mb-3">
                  For urgent delivery or food safety issues:
                </p>
                <Button variant="outline" className="w-full border-orange-300 text-orange-800">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Hotline
                </Button>
                <p className="text-xs text-orange-600 mt-2">
                  Available 24/7 for critical issues
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Link */}
        <Card className="mt-12">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Check our FAQ first</h3>
            <p className="text-muted-foreground mb-4">
              Many common questions are answered in our FAQ section
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/faq'}>
              View FAQ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
