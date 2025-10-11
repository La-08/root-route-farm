import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal } from "lucide-react";
import strawberriesImage from "@/assets/strawberries.jpg";
import vegetablesImage from "@/assets/vegetables-market.jpg";
import indianVegetablesImage from "@/assets/indian-vegetables.jpg";
import indianMangoesImage from "@/assets/indian-mangoes.jpg";

const mockProducts = [
  {
    id: 1,
    name: "Organic Strawberries",
    farmName: "Green Valley Farm",
    image: strawberriesImage,
    price: 200,
    unit: "kg",
    inStock: true,
    seasonal: true,
    organic: true,
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    farmName: "Sunrise Vegetables",
    image: indianVegetablesImage,
    price: 60,
    unit: "kg",
    inStock: true,
    seasonal: true,
    organic: false,
  },
  {
    id: 3,
    name: "Mixed Greens",
    farmName: "Happy Harvest",
    image: vegetablesImage,
    price: 80,
    unit: "bunch",
    inStock: true,
    seasonal: false,
    organic: true,
  },
  {
    id: 4,
    name: "Alphonso Mangoes",
    farmName: "Konkan Organic Farm",
    image: indianMangoesImage,
    price: 300,
    unit: "kg",
    inStock: true,
    seasonal: true,
    organic: true,
  },
  {
    id: 5,
    name: "Fresh Okra (Bhindi)",
    farmName: "Sunrise Vegetables",
    image: indianVegetablesImage,
    price: 40,
    unit: "kg",
    inStock: true,
    seasonal: false,
    organic: true,
  },
  {
    id: 6,
    name: "Green Chilies",
    farmName: "Happy Harvest",
    image: indianVegetablesImage,
    price: 80,
    unit: "kg",
    inStock: true,
    seasonal: false,
    organic: true,
  },
  {
    id: 7,
    name: "Fresh Coriander",
    farmName: "Green Valley Farm",
    image: vegetablesImage,
    price: 20,
    unit: "bunch",
    inStock: true,
    seasonal: false,
    organic: true,
  },
  {
    id: 8,
    name: "Organic Brinjal",
    farmName: "Konkan Organic Farm",
    image: indianVegetablesImage,
    price: 50,
    unit: "kg",
    inStock: false,
    seasonal: false,
    organic: true,
  },
];

export default function Products() {
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([300]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Fresh Products
              </h1>
              <p className="text-muted-foreground">
                Browse farm-fresh produce from verified local farms
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Search products..."
                className="flex-1 md:w-80"
              />
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0 space-y-6`}
          >
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <h3 className="font-display font-bold mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block">
                  Max Price: ₹{priceRange[0]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mb-2"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">Categories</Label>
                <div className="space-y-3">
                  {["Vegetables", "Fruits", "Dairy", "Grains", "Spices"].map(
                    (cat) => (
                      <div key={cat} className="flex items-center">
                        <Checkbox id={cat} />
                        <label
                          htmlFor={cat}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {cat}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">
                  Availability
                </Label>
                <div className="space-y-3">
                  {["In Stock", "Seasonal", "Pre-order"].map((option) => (
                    <div key={option} className="flex items-center">
                      <Checkbox id={option} />
                      <label
                        htmlFor={option}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">
                  Certifications
                </Label>
                <div className="space-y-3">
                  {["Organic", "Verified Farm", "Chemical-Free"].map(
                    (cert) => (
                      <div key={cert} className="flex items-center">
                        <Checkbox id={cert} />
                        <label
                          htmlFor={cert}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {cert}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {mockProducts.length}
                </span>{" "}
                products
              </p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
