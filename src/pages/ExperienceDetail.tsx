import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Star,
  Clock,
  Users,
  Camera,
  Utensils,
  Leaf,
  Calendar as CalendarIcon,
  Heart,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import experienceImage from "@/assets/farm-experience.jpg";
import indianFarmTourImage from "@/assets/indian-farm-tour.jpg";
import vegetablesImage from "@/assets/vegetables-market.jpg";

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

// Mock experience data
const experienceData = {
  id: 1,
  title: "Organic Farm Tour & Cooking Experience",
  description: "Join us for an immersive farm-to-table experience where you'll tour our organic farm, harvest fresh vegetables, and learn to cook traditional Indian dishes using ingredients straight from the soil.",
  images: [indianFarmTourImage, experienceImage, vegetablesImage],
  farm: {
    id: 1,
    name: "Green Valley Organic Farm",
    farmer: "Ramesh Kumar",
    distance: 4.2,
    rating: 4.8,
    verified: true,
    location: "Hyderabad, Telangana"
  },
  duration: "4 hours",
  price: 500,
  capacity: 20,
  included: [
    "Guided farm tour",
    "Hands-on harvesting experience",
    "Traditional cooking class",
    "Farm-fresh lunch",
    "Recipe booklet",
    "Transportation from pickup point"
  ],
  itinerary: [
    { time: "9:00 AM", activity: "Pickup from designated point" },
    { time: "9:30 AM", activity: "Welcome drink and farm introduction" },
    { time: "10:00 AM", activity: "Guided tour of organic farm" },
    { time: "11:00 AM", activity: "Hands-on vegetable harvesting" },
    { time: "12:00 PM", activity: "Traditional cooking class" },
    { time: "1:00 PM", activity: "Farm-fresh lunch together" },
    { time: "2:00 PM", activity: "Return journey begins" }
  ],
  availableDates: [
    "2024-02-15", "2024-02-16", "2024-02-17", 
    "2024-02-22", "2024-02-23", "2024-02-24"
  ],
  requirements: [
    "Comfortable walking shoes required",
    "Sun hat or cap recommended",
    "Minimum age: 8 years",
    "Maximum group size: 20 people"
  ]
};

export default function ExperienceDetail() {
  const t = useTranslations();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [participants, setParticipants] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const timeSlots = ["9:00 AM", "2:00 PM"];
  const totalPrice = experienceData.price * participants;

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot || !customerName || !customerPhone || !customerEmail) {
      toast.error(t("please_fill_required_fields"));
      return;
    }

    setIsBooking(true);
    
    // Simulate booking API call
    setTimeout(() => {
      toast.success(t("booking_confirmed"));
      setIsBooking(false);
      // Reset form or redirect to confirmation page
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: experienceData.title,
        text: experienceData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("link_copied"));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={experienceData.images[selectedImage]}
                  alt={experienceData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="secondary" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {experienceData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{experienceData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experienceData.farm.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{experienceData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{t("up_to").replace("{capacity}", String(experienceData.capacity))}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {experienceData.description}
                </p>
              </div>

              {/* Farm Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {experienceData.farm.name}
                        {experienceData.farm.verified && (
                          <Badge variant="secondary">
                            <Leaf className="h-3 w-3 mr-1" />
                            {t("verified")}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {t("hosted_by")} {experienceData.farm.farmer}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{experienceData.farm.rating}</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("whats_included")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {experienceData.included.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Itinerary */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("itinerary")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experienceData.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                          {item.time}
                        </div>
                        <div className="text-sm">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">{t("from_label")}</span>
                    <div className="text-2xl font-bold">₹{experienceData.price}</div>
                    <span className="text-sm text-muted-foreground">{t("per_person")}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div>
                  <Label className="text-sm font-medium">{t("select_date")}</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border mt-2"
                    disabled={(date) => 
                      date < new Date() || 
                      !experienceData.availableDates.includes(date.toISOString().split('T')[0])
                    }
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <Label className="text-sm font-medium">{t("select_time")}</Label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("choose_time_slot")} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Participants */}
                <div>
                  <Label className="text-sm font-medium">{t("participants")}</Label>
                  <Select value={String(participants)} onValueChange={(value) => setParticipants(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: Math.min(experienceData.capacity, 10)}, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1} {i === 0 ? t("person") : t("people")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="space-y-3">
                  <h4 className="font-medium">{t("contact_information")}</h4>
                  
                  <div>
                    <Label htmlFor="name">{t("full_name")} *</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t("enter_name")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t("phone_number")} *</Label>
                    <Input
                      id="phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t("enter_phone")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">{t("email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder={t("enter_email")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requests">{t("special_requests")}</Label>
                    <Textarea
                      id="requests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder={t("any_special_requests")}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₹{experienceData.price} × {participants} {participants === 1 ? t("person") : t("people")}</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>{t("total")}</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleBooking}
                  disabled={isBooking}
                >
                  {isBooking ? t("booking") : t("book_experience")}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t("free_cancellation_24h")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
