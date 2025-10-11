import { useState } from "react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, Calendar } from "lucide-react";
import experienceImage from "@/assets/farm-experience.jpg";
import vegetablesImage from "@/assets/vegetables-market.jpg";
import indianFarmTourImage from "@/assets/indian-farm-tour.jpg";

const mockExperiences = [
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
    farmName: "Sunrise Vegetables",
    image: vegetablesImage,
    duration: "3 hours",
    price: 750,
    capacity: 15,
    distance: 6.5,
  },
  {
    id: 3,
    title: "Traditional Farming Experience",
    farmName: "Happy Harvest Farm",
    image: experienceImage,
    duration: "Full day",
    price: 1200,
    capacity: 12,
    distance: 8.1,
  },
  {
    id: 4,
    title: "Organic Cooking Workshop",
    farmName: "Konkan Organic Farm",
    image: indianFarmTourImage,
    duration: "5 hours",
    price: 900,
    capacity: 10,
    distance: 12.3,
  },
  {
    id: 5,
    title: "Farm Stay Weekend",
    farmName: "Green Valley Farm",
    image: experienceImage,
    duration: "2 days",
    price: 3500,
    capacity: 8,
    distance: 4.2,
  },
  {
    id: 6,
    title: "Dairy Farm Visit",
    farmName: "Nature's Bounty Farm",
    image: vegetablesImage,
    duration: "3 hours",
    price: 400,
    capacity: 25,
    distance: 15.8,
  },
];

export default function Experiences() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Farm Experiences
              </h1>
              <p className="text-muted-foreground">
                Book authentic farm visits, workshops, and stays
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                placeholder="Search experiences..."
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

              {/* Experience Type */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">
                  Experience Type
                </Label>
                <div className="space-y-3">
                  {[
                    "Farm Tours",
                    "Workshops",
                    "Farm Stays",
                    "Cooking Classes",
                    "Family Activities",
                  ].map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox id={type} />
                      <label
                        htmlFor={type}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">Duration</Label>
                <div className="space-y-3">
                  {[
                    "2-3 hours",
                    "4-5 hours",
                    "Full day",
                    "Overnight",
                    "Weekend",
                  ].map((duration) => (
                    <div key={duration} className="flex items-center">
                      <Checkbox id={duration} />
                      <label
                        htmlFor={duration}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">Price Range</Label>
                <div className="space-y-3">
                  {[
                    "Under ₹500",
                    "₹500 - ₹1000",
                    "₹1000 - ₹2000",
                    "Above ₹2000",
                  ].map((range) => (
                    <div key={range} className="flex items-center">
                      <Checkbox id={range} />
                      <label
                        htmlFor={range}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">Suitable For</Label>
                <div className="space-y-3">
                  {["Families", "Couples", "Groups", "Kids", "All Ages"].map(
                    (suitable) => (
                      <div key={suitable} className="flex items-center">
                        <Checkbox id={suitable} />
                        <label
                          htmlFor={suitable}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {suitable}
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

            {/* Quick Date Picker */}
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-display font-bold">Check Availability</h3>
              </div>
              <Input type="date" className="mb-3" />
              <Button className="w-full">Search Dates</Button>
            </div>
          </aside>

          {/* Experiences Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Found{" "}
                <span className="font-semibold text-foreground">
                  {mockExperiences.length}
                </span>{" "}
                experiences
              </p>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Distance</option>
                <option>Duration</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {mockExperiences.map((experience) => (
                <ExperienceCard key={experience.id} {...experience} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
