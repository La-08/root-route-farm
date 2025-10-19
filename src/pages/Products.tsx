import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Search, Filter } from "lucide-react";
import strawberriesImage from "@/assets/strawberries.jpg";
import vegetablesImage from "@/assets/vegetables-market.jpg";
import indianVegetablesImage from "@/assets/indian-vegetables.jpg";
import indianMangoesImage from "@/assets/indian-mangoes.jpg";

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
	const t = useTranslations();
	const [showFilters, setShowFilters] = useState(false);
	const [priceRange, setPriceRange] = useState<number[]>([500]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
	const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState("rating");
	const [filteredProducts, setFilteredProducts] = useState(mockProducts);

	// Filter products based on all criteria
	useEffect(() => {
		let filtered = [...mockProducts];

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(product =>
				t(product.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
				t(product.farmName).toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Price filter
		filtered = filtered.filter(product => product.price <= priceRange[0]);

		// Category filter
		if (selectedCategories.length > 0) {
			filtered = filtered.filter(product => {
				// Simple category matching based on product name
				const productName = t(product.name).toLowerCase();
				return selectedCategories.some(cat => {
					const categoryName = t(cat).toLowerCase();
					return productName.includes(categoryName) || 
						   (cat === "category.vegetables" && (productName.includes("tomato") || productName.includes("okra") || productName.includes("brinjal") || productName.includes("green") || productName.includes("coriander"))) ||
						   (cat === "category.fruits" && (productName.includes("strawberries") || productName.includes("mango")));
				});
			});
		}

		// Availability filter
		if (selectedAvailability.length > 0) {
			filtered = filtered.filter(product => {
				return selectedAvailability.some(avail => {
					if (avail === "option.in_stock") return product.inStock;
					if (avail === "option.seasonal") return product.seasonal;
					if (avail === "option.preorder") return !product.inStock;
					return true;
				});
			});
		}

		// Certification filter
		if (selectedCertifications.length > 0) {
			filtered = filtered.filter(product => {
				return selectedCertifications.some(cert => {
					if (cert === "organic") return product.organic;
					if (cert === "verified") return true; // All products are verified
					if (cert === "chemical_free") return product.organic;
					return true;
				});
			});
		}

		// Sort products
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "price_low":
					return a.price - b.price;
				case "price_high":
					return b.price - a.price;
				case "name":
					return t(a.name).localeCompare(t(b.name));
				case "newest":
					return b.id - a.id;
				default:
					return 0; // Keep original order for rating
			}
		});

		setFilteredProducts(filtered);
	}, [searchTerm, priceRange, selectedCategories, selectedAvailability, selectedCertifications, sortBy, t]);

	const handleCategoryChange = (category: string, checked: boolean) => {
		if (checked) {
			setSelectedCategories([...selectedCategories, category]);
		} else {
			setSelectedCategories(selectedCategories.filter(c => c !== category));
		}
	};

	const handleAvailabilityChange = (availability: string, checked: boolean) => {
		if (checked) {
			setSelectedAvailability([...selectedAvailability, availability]);
		} else {
			setSelectedAvailability(selectedAvailability.filter(a => a !== availability));
		}
	};

	const handleCertificationChange = (certification: string, checked: boolean) => {
		if (checked) {
			setSelectedCertifications([...selectedCertifications, certification]);
		} else {
			setSelectedCertifications(selectedCertifications.filter(c => c !== certification));
		}
	};

	const clearAllFilters = () => {
		setSearchTerm("");
		setPriceRange([500]);
		setSelectedCategories([]);
		setSelectedAvailability([]);
		setSelectedCertifications([]);
		setSortBy("rating");
	};

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
							<div className="relative flex-1 md:w-80">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									placeholder={t("search") + " " + t("products")}
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
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
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-display font-bold flex items-center gap-2">
									<Filter className="h-5 w-5" />
									{t("filters")}
								</h3>
								{(selectedCategories.length > 0 || selectedAvailability.length > 0 || selectedCertifications.length > 0) && (
									<Badge variant="secondary" className="text-xs">
										{selectedCategories.length + selectedAvailability.length + selectedCertifications.length}
									</Badge>
								)}
							</div>

							{/* Price Range */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									{t("price_range")}: ₹0 - ₹{priceRange[0]}
								</Label>
								<Slider
									value={priceRange}
									onValueChange={setPriceRange}
									max={500}
									step={10}
									className="mb-2"
								/>
								<div className="flex justify-between text-xs text-muted-foreground">
									<span>₹0</span>
									<span>₹500+</span>
								</div>
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
											<Checkbox 
												id={catKey} 
												checked={selectedCategories.includes(catKey)}
												onCheckedChange={(checked) => handleCategoryChange(catKey, checked as boolean)}
											/>
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
												<Checkbox 
													id={optKey}
													checked={selectedAvailability.includes(optKey)}
													onCheckedChange={(checked) => handleAvailabilityChange(optKey, checked as boolean)}
												/>
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
											<Checkbox 
												id={certKey}
												checked={selectedCertifications.includes(certKey)}
												onCheckedChange={(checked) => handleCertificationChange(certKey, checked as boolean)}
											/>
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

							<Button variant="outline" className="w-full" onClick={clearAllFilters}>
								{t("clear_filters")}
							</Button>
						</div>
					</aside>

					{/* Products Grid */}
					<main className="flex-1">
						<div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<p className="text-muted-foreground">
									{t("showing_products").replace(
										"{n}",
										String(filteredProducts.length)
									)}
								</p>
								{(selectedCategories.length > 0 || selectedAvailability.length > 0 || selectedCertifications.length > 0 || searchTerm) && (
									<Button variant="ghost" size="sm" onClick={clearAllFilters}>
										{t("clear_filters")}
									</Button>
								)}
							</div>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-48">
									<SelectValue placeholder={t("sort_by")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="rating">{t("sort_rating")}</SelectItem>
									<SelectItem value="price_low">{t("sort_price")} (Low to High)</SelectItem>
									<SelectItem value="price_high">{t("sort_price")} (High to Low)</SelectItem>
									<SelectItem value="name">Name (A-Z)</SelectItem>
									<SelectItem value="newest">{t("sort_newest")}</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Active Filters */}
						{(selectedCategories.length > 0 || selectedAvailability.length > 0 || selectedCertifications.length > 0) && (
							<div className="mb-6">
								<div className="flex flex-wrap gap-2 mb-2">
									<span className="text-sm text-muted-foreground">Active filters:</span>
									{selectedCategories.map(cat => (
										<Badge key={cat} variant="secondary" className="text-xs">
											{t(cat)}
											<button 
												className="ml-1 hover:text-destructive"
												onClick={() => handleCategoryChange(cat, false)}
											>
												×
											</button>
										</Badge>
									))}
									{selectedAvailability.map(avail => (
										<Badge key={avail} variant="secondary" className="text-xs">
											{t(avail)}
											<button 
												className="ml-1 hover:text-destructive"
												onClick={() => handleAvailabilityChange(avail, false)}
											>
												×
											</button>
										</Badge>
									))}
									{selectedCertifications.map(cert => (
										<Badge key={cert} variant="secondary" className="text-xs">
											{t(cert)}
											<button 
												className="ml-1 hover:text-destructive"
												onClick={() => handleCertificationChange(cert, false)}
											>
												×
											</button>
										</Badge>
									))}
								</div>
							</div>
						)}

						{filteredProducts.length === 0 ? (
							<div className="text-center py-12">
								<div className="mb-4">
									<Search className="h-12 w-12 mx-auto text-muted-foreground" />
								</div>
								<h3 className="text-lg font-semibold mb-2">No products found</h3>
								<p className="text-muted-foreground mb-4">
									Try adjusting your filters or search terms
								</p>
								<Button onClick={clearAllFilters}>
									{t("clear_filters")}
								</Button>
							</div>
						) : (
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredProducts.map((product) => (
									<ProductCard key={product.id} {...product} />
								))}
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
