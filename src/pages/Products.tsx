import { useState, useEffect } from "react";
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
		name: "product.1.name",
		farmName: "farm.1.name",
		image: strawberriesImage,
		price: 200,
		unit: "kg",
		inStock: true,
		seasonal: true,
		organic: true,
	},
	{
		id: 2,
		name: "product.2.name",
		farmName: "farm.2.name",
		image: indianVegetablesImage,
		price: 60,
		unit: "kg",
		inStock: true,
		seasonal: true,
		organic: false,
	},
	{
		id: 3,
		name: "product.3.name",
		farmName: "farm.3.name",
		image: vegetablesImage,
		price: 80,
		unit: "bunch",
		inStock: true,
		seasonal: false,
		organic: true,
	},
	{
		id: 4,
		name: "product.4.name",
		farmName: "farm.4.name",
		image: indianMangoesImage,
		price: 300,
		unit: "kg",
		inStock: true,
		seasonal: true,
		organic: true,
	},
	{
		id: 5,
		name: "product.5.name",
		farmName: "farm.2.name",
		image: indianVegetablesImage,
		price: 40,
		unit: "kg",
		inStock: true,
		seasonal: false,
		organic: true,
	},
	{
		id: 6,
		name: "product.6.name",
		farmName: "farm.3.name",
		image: indianVegetablesImage,
		price: 80,
		unit: "kg",
		inStock: true,
		seasonal: false,
		organic: true,
	},
	{
		id: 7,
		name: "product.7.name",
		farmName: "farm.1.name",
		image: vegetablesImage,
		price: 20,
		unit: "bunch",
		inStock: true,
		seasonal: false,
		organic: true,
	},
	{
		id: 8,
		name: "product.8.name",
		farmName: "farm.4.name",
		image: indianVegetablesImage,
		price: 50,
		unit: "kg",
		inStock: false,
		seasonal: false,
		organic: true,
	},
];

export default function Products() {
	const [, setTick] = useState(0);
	const [showFilters, setShowFilters] = useState(false);
	const [priceRange, setPriceRange] = useState<number[]>([500]);

	useEffect(() => {
		const h = () => setTick((s) => s + 1);
		window.addEventListener("langchange", h);
		return () => window.removeEventListener("langchange", h);
	}, []);
	type Win = Window & { __i18n?: { t: (k: string) => string } };
	const w = window as Win;
	const t = (k: string) => w.__i18n?.t(k) ?? k;

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b bg-card">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between">
						<div>
							<h1 className="font-display text-3xl font-bold mb-2">
								{t("products")}
							</h1>
							<p className="text-muted-foreground">
								{t("discover_trusted")}
							</p>
						</div>
						<div className="flex gap-2 w-full md:w-auto">
							<Input
								placeholder={t("search") + " " + t("hero_search")}
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
							<h3 className="font-display font-bold mb-4">{t("filters")}</h3>

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
								<Label className="mb-3 block font-semibold">
									{t("categories")}
								</Label>
								<div className="space-y-3">
									{[
										"category.vegetables",
										"category.fruits",
										"category.dairy",
										"category.grains",
										"category.spices",
									].map((catKey) => (
										<div key={catKey} className="flex items-center">
											<Checkbox id={catKey} />
											<label
												htmlFor={catKey}
												className="ml-2 text-sm cursor-pointer"
											>
												{t(catKey)}
											</label>
										</div>
									))}
								</div>
							</div>

							{/* Availability */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									Availability
								</Label>
								<div className="space-y-3">
									{["option.in_stock", "option.seasonal", "option.preorder"].map(
										(optKey) => (
											<div key={optKey} className="flex items-center">
												<Checkbox id={optKey} />
												<label
													htmlFor={optKey}
													className="ml-2 text-sm cursor-pointer"
												>
													{t(optKey)}
												</label>
											</div>
										)
									)}
								</div>
							</div>

							{/* Certifications */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									Certifications
								</Label>
								<div className="space-y-3">
									{["organic", "verified", "chemical_free"].map((certKey) => (
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

							<Button variant="outline" className="w-full">
								{t("clear_filters")}
							</Button>
						</div>
					</aside>

					{/* Products Grid */}
					<main className="flex-1">
						<div className="mb-6 flex items-center justify-between">
							<p className="text-muted-foreground">
								{t("showing_products").replace(
									"{n}",
									String(mockProducts.length)
								)}
							</p>
							<select className="border rounded-md px-3 py-2 text-sm">
								<option>{t("sort_rating")}</option>
								<option>{t("sort_price")}</option>
								<option>{t("sort_price")}</option>
								<option>{t("sort_newest")}</option>
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
