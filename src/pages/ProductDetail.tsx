import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import {
  MapPin,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Store,
  Calendar,
} from "lucide-react";
import strawberriesImage from "@/assets/strawberries.jpg";
import vegetablesImage from "@/assets/vegetables-market.jpg";
import { toast } from "sonner";

const productData = {
  id: 1,
  name: "Organic Strawberries",
  category: "Fruits",
  price: 200,
  unit: "kg",
  inStock: true,
  stock: 50,
  seasonal: true,
  organic: true,
  images: [strawberriesImage, vegetablesImage],
  farm: {
    id: 1,
    name: "Green Valley Organic Farm",
    farmer: "Ramesh Kumar",
    distance: 4.2,
    rating: 4.8,
    verified: true,
  },
  description:
    "Fresh, juicy organic strawberries grown with love and care. Hand-picked at peak ripeness for maximum flavor and nutrition. Perfect for fresh eating, smoothies, or desserts.",
  nutritionalInfo: [
    "Rich in Vitamin C and antioxidants",
    "Low in calories, high in fiber",
    "Supports heart health",
    "Boosts immune system",
  ],
  harvestDate: "2024-10-10",
  deliveryOptions: {
    homeDelivery: true,
    farmPickup: true,
    subscription: true,
  },
};

const similarProducts = [
  {
    id: 2,
    name: "Fresh Blueberries",
    farmName: "Green Valley Farm",
    image: vegetablesImage,
    price: 250,
    unit: "kg",
    inStock: true,
    seasonal: true,
    organic: true,
  },
  {
    id: 3,
    name: "Mixed Berries",
    farmName: "Green Valley Farm",
    image: strawberriesImage,
    price: 220,
    unit: "kg",
    inStock: true,
    seasonal: true,
    organic: true,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    toast.success(`${quantity}kg of ${productData.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{productData.name}</span>
        </div>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="bg-muted rounded-lg overflow-hidden mb-4 aspect-square">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {productData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary scale-105"
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

          {/* Details */}
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="seasonal">Seasonal</Badge>
              <Badge variant="organic">Organic Certified</Badge>
              <Badge variant="success">In Stock ({productData.stock}kg)</Badge>
            </div>
            <h1 className="font-display text-4xl font-bold mb-2">
              {productData.name}
            </h1>
            <p className="text-muted-foreground mb-4">{productData.category}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-primary">
                ₹{productData.price}
              </span>
              <span className="text-xl text-muted-foreground">
                /{productData.unit}
              </span>
            </div>

            {/* Farm Info */}
            <Link to={`/farm/${productData.farm.id}`}>
              <div className="bg-card rounded-lg p-4 shadow-soft mb-6 hover-lift transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                      {productData.farm.farmer[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{productData.farm.name}</p>
                      <p className="text-sm text-muted-foreground">
                        by {productData.farm.farmer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm mb-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-semibold">
                        {productData.farm.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{productData.farm.distance}km</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold mb-3">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Nutritional Info */}
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold mb-3">
                Nutritional Benefits
              </h2>
              <ul className="space-y-2">
                {productData.nutritionalInfo.map((info, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="font-semibold mb-3 block">Quantity (kg)</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(productData.stock, quantity + 1))
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <div className="ml-auto text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{productData.price * quantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Delivery Options</h3>
              <div className="space-y-2">
                {productData.deliveryOptions.homeDelivery && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Home Delivery Available</span>
                  </div>
                )}
                {productData.deliveryOptions.farmPickup && (
                  <div className="flex items-center gap-2 text-sm">
                    <Store className="h-4 w-4 text-primary" />
                    <span>Farm Pickup Available</span>
                  </div>
                )}
                {productData.deliveryOptions.subscription && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Subscribe for Weekly Delivery</span>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart - ₹{productData.price * quantity}
            </Button>
          </div>
        </div>

        {/* Similar Products */}
        <section>
          <h2 className="font-display text-3xl font-bold mb-6">
            Similar Products
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
