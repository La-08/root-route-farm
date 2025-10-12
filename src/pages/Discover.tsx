import { useState, useEffect } from "react";
import { FarmCard } from "@/components/FarmCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Map, List, SlidersHorizontal } from "lucide-react";
import indianFarmerImage from "@/assets/indian-farmer.jpg";
import indianVegetablesImage from "@/assets/indian-vegetables.jpg";
import indianWomanFarmerImage from "@/assets/indian-woman-farmer.jpg";
import indianFarmTourImage from "@/assets/indian-farm-tour.jpg";

const mockFarms = [
	{
		id: 1,
		name: "farm.1.name",
		farmer: "Ramesh Kumar",
		image: indianFarmerImage,
		distance: 4.2,
		rating: 4.8,
		reviewCount: 127,
		verified: true,
		organic: true,
	},
	{
		id: 2,
		name: "farm.2.name",
		farmer: "Priya Sharma",
		image: indianVegetablesImage,
		distance: 6.5,
		rating: 4.6,
		reviewCount: 89,
		verified: true,
		organic: false,
	},
	{
		id: 3,
		name: "farm.3.name",
		farmer: "Anil Patel",
		image: indianWomanFarmerImage,
		distance: 8.1,
		rating: 4.9,
		reviewCount: 203,
		verified: true,
		organic: true,
	},
	{
		id: 4,
		name: "farm.4.name",
		farmer: "Sunita Reddy",
		image: indianFarmTourImage,
		distance: 12.3,
		rating: 4.7,
		reviewCount: 156,
		verified: true,
		organic: true,
	},
	{
		id: 5,
		name: "farm.5.name",
		farmer: "Vikram Singh",
		image: indianVegetablesImage,
		distance: 15.8,
		rating: 4.5,
		reviewCount: 78,
		verified: false,
		organic: false,
	},
	{
		id: 6,
		name: "farm.6.name",
		farmer: "Meena Desai",
		image: indianFarmerImage,
		distance: 18.2,
		rating: 4.9,
		reviewCount: 245,
		verified: true,
		organic: true,
	},
];

export default function Discover() {
	// --- Added: missing state hooks ---
	const [viewMode, setViewMode] = useState<"list" | "map">("list");
	const [distance, setDistance] = useState<number[]>([25]);
	const [showFilters, setShowFilters] = useState(true);
	// --- end added ---

	const [, setTick] = useState(0);
	useEffect(() => {
		const h = () => setTick((s) => s + 1);
		window.addEventListener("langchange", h);
		return () => window.removeEventListener("langchange", h);
	}, []);
	type I18n = { t: (k: string) => string };
	const t = (k: string) =>
		(window as Window & { __i18n?: I18n }).__i18n?.t(k) ?? k;

	return (
		<div className="min-h-screen bg-background">
			{/* Search Header */}
			<div className="border-b bg-card">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col md:flex-row gap-4 items-center">
						<Input
							placeholder={t("search") + " " + t("hero_search")}
							className="flex-1"
						/>
						<div className="flex gap-2">
							<Button
								variant={viewMode === "list" ? "default" : "outline"}
								size="icon"
								onClick={() => setViewMode("list")}
							>
								<List className="h-5 w-5" />
							</Button>
							<Button
								variant={viewMode === "map" ? "default" : "outline"}
								size="icon"
								onClick={() => setViewMode("map")}
							>
								<Map className="h-5 w-5" />
							</Button>
							<Button
								variant="outline"
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
							<h3 className="font-display font-bold mb-4">{t("filters")}</h3>

							{/* Distance */}
							<div className="mb-6">
								<Label className="mb-3 block">
									Distance: {distance[0]}km
								</Label>
								<Slider
									value={distance}
									onValueChange={setDistance}
									max={50}
									step={5}
									className="mb-2"
								/>
							</div>

							{/* Categories */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									{t("categories")}
								</Label>
								<div className="space-y-3">
									{[
										"category.vegetables",
										"category.fruits",
										"category.dairy",
										"category.grains",
										"category.honey",
									].map((catKey) => (
										<div key={catKey} className="flex items-center">
											<Checkbox id={catKey} />
											<label htmlFor={catKey} className="ml-2 text-sm cursor-pointer">
												{t(catKey)}
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
									{["verified", "organic", "seasonal"].map((certKey) => (
										<div key={certKey} className="flex items-center">
											<Checkbox id={certKey} />
											<label
												htmlFor={certKey}
												className="ml-2 text-sm cursor-pointer"
											>
												{t(certKey)}
											</label>
										</div>
									))}
								</div>
							</div>

							{/* Delivery Options */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									Delivery Options
								</Label>
								<div className="space-y-3">
									{["delivery.home", "delivery.pickup", "delivery.subscription"].map(
										(opt) => (
											<div key={opt} className="flex items-center">
												<Checkbox id={opt} />
												<label
													htmlFor={opt}
													className="ml-2 text-sm cursor-pointer"
												>
													{t(opt)}
												</label>
											</div>
										)
									)}
								</div>
							</div>

							<Button variant="outline" className="w-full">
								{t("clear_filters")}
							</Button>
						</div>
					</aside>

					{/* Results */}
					<main className="flex-1">
						<div className="mb-6 flex items-center justify-between">
							<p className="text-muted-foreground">
								{t("found_farms").replace("{n}", String(mockFarms.length))}
							</p>
							<select className="border rounded-md px-3 py-2 text-sm">
								<option>{t("sort_distance")}</option>
								<option>{t("sort_rating")}</option>
								<option>{t("sort_price")}</option>
								<option>{t("sort_newest")}</option>
							</select>
						</div>

						{viewMode === "list" ? (
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{mockFarms.map((farm) => (
									<FarmCard key={farm.id} {...farm} />
								))}
							</div>
						) : (
							<div className="bg-muted rounded-lg h-[600px] flex items-center justify-center">
								<div className="text-center">
									<Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
									<p className="text-muted-foreground">
										Map view coming soon
									</p>
								</div>
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
