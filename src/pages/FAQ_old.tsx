import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";
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

const getFaqData = (t: (key: string) => string) => [
  {
    id: "general-1",
    question: t("faq.general.what_is"),
    answer: t("faq.general.what_is_answer")
  },
  {
    id: "general-2", 
    question: t("faq.general.how_order"),
    answer: t("faq.general.how_order_answer")
  },
  {
    id: "general-3",
    question: t("faq.general.payment_methods"),
    answer: t("faq.general.payment_methods_answer")
  },
  {
    id: "farmer-1",
    question: t("faq.farmer.become"),
    answer: t("faq.farmer.become_answer")
  },
  {
    id: "farmer-2",
    question: t("faq.farmer.commission"),
    answer: t("faq.farmer.commission_answer")
  },
  {
    id: "delivery-1",
    question: t("faq.delivery.become"),
    answer: t("faq.delivery.become_answer")
  },
  {
    id: "delivery-2",
    question: t("faq.delivery.earnings"),
    answer: t("faq.delivery.earnings_answer")
  },
  {
    id: "customer-1",
    question: t("faq.customer.freshness"),
    answer: t("faq.customer.freshness_answer")
  },
  {
    id: "customer-2",
    question: t("faq.customer.satisfaction"),
    answer: t("faq.customer.satisfaction_answer")
  }
];

export default function FAQ() {
  const navigate = useNavigate();
  const t = useTranslations();
  const faqData = getFaqData(t);
    answer: "We offer 100% satisfaction guarantee. Contact our support team within 24 hours for refund or replacement."
  },
  {
    id: "tech-1",
    question: "Do you have a mobile app?",
    answer: "Yes! Download our mobile app from Play Store or App Store for easier ordering and real-time tracking."
  }
];

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Roots & Routes platform, orders, farming, and deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Still have questions?</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Contact our support team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/live-chat')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('tel:+911234567890')}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('mailto:support@rootsandroutes.com')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2"
                  onClick={() => navigate('/about')}
                >
                  About Us
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2"
                  onClick={() => navigate('/sustainability')}
                >
                  Sustainability
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2"
                  onClick={() => navigate('/farming-tips')}
                >
                  Farming Tips
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2"
                  onClick={() => navigate('/market-prices')}
                >
                  Market Prices
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
