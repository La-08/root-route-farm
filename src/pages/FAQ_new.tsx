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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("faq.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("faq.title")}</CardTitle>
                <CardDescription>
                  {t("faq.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {t("faq.need_help")}
                </CardTitle>
                <CardDescription>
                  {t("faq.contact_support")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="w-full"
                  variant="default"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t("contact_us")}
                </Button>
                <Button 
                  onClick={() => navigate('/live-chat')}
                  className="w-full"
                  variant="outline"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("live_chat")}
                </Button>
                <Button 
                  onClick={() => window.location.href = 'tel:+919876543210'}
                  className="w-full"
                  variant="outline"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {t("contact.emergency")}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>{t("nav.support")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/about')}
                >
                  {t("about_us")}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/how-it-works')}
                >
                  {t("nav.how_it_works")}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/sustainability')}
                >
                  {t("sustainability")}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/careers')}
                >
                  {t("careers")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
