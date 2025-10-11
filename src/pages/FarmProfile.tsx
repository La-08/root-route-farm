import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  BadgeCheck,
  Share2,
  Calendar,
  Users,
  Sprout,
} from "lucide-react";
import indianFarmerImage from "@/assets/indian-farmer.jpg";
import indianVegetablesImage from "@/assets/indian-vegetables.jpg";
import indianFarmTourImage from "@/assets/indian-farm-tour.jpg";
import indianMangoesImage from "@/assets/indian-mangoes.jpg";

// Mock data
const farmData = {
  id: 1,
  name: "Green Valley Organic Farm",
  farmer: { name: "Ramesh Kumar", avatar: "RK" },
  location: "Hyderabad, Telangana",
  distance: 4.2,
  verified: true,
  organic: true,
  rating: 4.8,
  reviewCount: 127,
  established: "2010",
  images: [indianFarmerImage, indianFarmTourImage, indianVegetablesImage],
  about:
    "Green Valley is a family-run organic farm spanning 15 acres, dedicated to sustainable farming practices. We grow seasonal vegetables, fruits, and herbs using traditional methods combined with modern organic techniques. Our farm has been certified organic since 2015 and we take pride in providing the freshest, healthiest produce to our community.",
  products: [
    {
      id: 1,
      name: "Alphonso Mangoes",
      farmName: "Green Valley Farm",
      image: indianMangoesImage,
      price: 300,
      unit: "kg",
      inStock: true,
      seasonal: true,
      organic: true,
    },
    {
      id: 2,
      name: "Fresh Tomatoes",
      farmName: "Green Valley Farm",
      image: indianVegetablesImage,
      price: 60,
      unit: "kg",
      inStock: true,
      seasonal: true,
      organic: true,
    },
    {
      id: 3,
      name: "Mixed Greens",
      farmName: "Green Valley Farm",
      image: indianVegetablesImage,
      price: 80,
      unit: "bunch",
      inStock: true,
      seasonal: false,
      organic: true,
    },
  ],
  experiences: [
    {
      id: 1,
      title: "Organic Farm Day Tour",
      farmName: "Green Valley Farm",
      image: indianFarmTourImage,
      duration: "4 hours",
      price: 500,
      capacity: 20,
      distance: 4.2,
    },
    {
      id: 2,
      title: "Farm to Table Workshop",
      farmName: "Green Valley Farm",
      image: indianVegetablesImage,
      duration: "3 hours",
      price: 750,
      capacity: 15,
      distance: 4.2,
    },
  ],
};

export default function FarmProfile() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image Gallery */}
      <div className="relative h-[400px] bg-muted">
        <img
          src={farmData.images[selectedImage]}
          alt={farmData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-4xl font-bold">
                    {farmData.name}
                  </h1>
                  {farmData.verified && (
                    <Badge variant="verified" className="shadow-soft">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {farmData.organic && (
                    <Badge variant="organic" className="shadow-soft">
                      Organic Certified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">{farmData.rating}</span>
                    <span>({farmData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-5 w-5" />
                    <span>{farmData.distance}km away</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-5 w-5" />
                    <span>Est. {farmData.established}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-foreground">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Thumbnail Strip */}
        <div className="absolute bottom-24 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex gap-2">
              {farmData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-16 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-white scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="products">
              Products ({farmData.products.length})
            </TabsTrigger>
            <TabsTrigger value="experiences">
              Experiences ({farmData.experiences.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="font-display text-2xl font-bold mb-4">
                  About {farmData.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {farmData.about}
                </p>

                <h3 className="font-display text-xl font-bold mb-4">
                  Farming Practices
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Sprout className="h-5 w-5 text-primary mt-0.5" />
                    <span>100% organic, no synthetic pesticides or fertilizers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sprout className="h-5 w-5 text-primary mt-0.5" />
                    <span>Crop rotation and companion planting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sprout className="h-5 w-5 text-primary mt-0.5" />
                    <span>Rainwater harvesting and drip irrigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sprout className="h-5 w-5 text-primary mt-0.5" />
                    <span>Compost-based soil enrichment</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="font-display font-bold mb-4">
                    Meet the Farmer
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold">
                      {farmData.farmer.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{farmData.farmer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Farm Owner
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">Contact Farmer</Button>
                </div>

                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="font-display font-bold mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance</span>
                      <span className="font-semibold">
                        {farmData.distance}km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Established</span>
                      <span className="font-semibold">
                        {farmData.established}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-semibold">
                        {farmData.rating} ★ ({farmData.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">
                Available Products
              </h2>
              <p className="text-muted-foreground">
                Fresh produce from our farm
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmData.products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">
                Farm Experiences
              </h2>
              <p className="text-muted-foreground">
                Visit our farm and learn about organic farming
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {farmData.experiences.map((experience) => (
                <ExperienceCard key={experience.id} {...experience} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">
                Customer Reviews
              </h2>
              <p className="text-muted-foreground">
                {farmData.reviewCount} reviews
              </p>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      U{i}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">User {i}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className="h-4 w-4 fill-accent text-accent"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        2 weeks ago
                      </p>
                      <p className="text-muted-foreground">
                        Amazing quality produce! The tomatoes were so fresh and
                        flavorful. Will definitely order again.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="location">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">Location</h2>
              <p className="text-muted-foreground">{farmData.location}</p>
            </div>
            <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Map view coming soon</p>
                <Button className="mt-4">Get Directions</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
