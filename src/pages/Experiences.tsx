import { useState, useEffect } from "react";
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
		title: "experience.1.title",
		farmName: "farm.1.name",
		image: indianFarmTourImage,
		duration: "4 hours",
		price: 500,
		capacity: 20,
		distance: 4.2,
	},
	{
		id: 2,
		title: "experience.2.title",
		farmName: "farm.2.name",
		image: vegetablesImage,
		duration: "3 hours",
		price: 750,
		capacity: 15,
		distance: 6.5,
	},
	{
		id: 3,
		title: "experience.3.title",
		farmName: "farm.3.name",
		image: experienceImage,
		duration: "Full day",
		price: 1200,
		capacity: 12,
		distance: 8.1,
	},
	{
		id: 4,
		title: "experience.4.title",
		farmName: "farm.4.name",
		image: indianFarmTourImage,
		duration: "5 hours",
		price: 900,
		capacity: 10,
		distance: 12.3,
	},
	{
		id: 5,
		title: "experience.5.title",
		farmName: "farm.5.name",
		image: experienceImage,
		duration: "2 days",
		price: 3500,
		capacity: 8,
		distance: 4.2,
	},
	{
		id: 6,
		title: "experience.6.title",
		farmName: "farm.6.name",
		image: vegetablesImage,
		duration: "3 hours",
		price: 400,
		capacity: 25,
		distance: 15.8,
	},
];

export default function Experiences() {
	// missing UI state
	const [showFilters, setShowFilters] = useState(true);

	// trigger re-render on language change
	const [, setTick] = useState(0);
	useEffect(() => {
		const h = () => setTick((s) => s + 1);
		window.addEventListener("langchange", h);
		return () => window.removeEventListener("langchange", h);
	}, []);

	// typed accessor for global i18n helper
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
								{t("farm_experiences")}
							</h1>
							<p className="text-muted-foreground">
								{t("fresh_produce")}
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

							{/* Experience Type */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									{t("experience_type") ?? "Experience Type"}
								</Label>
								<div className="space-y-3">
									{[
										"type.farm_tours",
										"type.workshops",
										"type.farm_stays",
										"type.cooking_classes",
										"type.family_activities",
									].map((typeKey) => (
										<div key={typeKey} className="flex items-center">
											<Checkbox id={typeKey} />
											<label htmlFor={typeKey} className="ml-2 text-sm cursor-pointer">
												{t(typeKey)}
											</label>
										</div>
									))}
								</div>
							</div>

							{/* Duration */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									{t("duration") ?? "Duration"}
								</Label>
								<div className="space-y-3">
									{[
										"duration.2_3",
										"duration.4_5",
										"duration.full_day",
										"duration.overnight",
										"duration.weekend",
									].map((dKey) => (
										<div key={dKey} className="flex items-center">
											<Checkbox id={dKey} />
											<label htmlFor={dKey} className="ml-2 text-sm cursor-pointer">
												{t(dKey)}
											</label>
										</div>
									))}
								</div>
							</div>

							{/* Price Range */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									{t("price_range") ?? "Price Range"}
								</Label>
								<div className="space-y-3">
									{[
										"price.under_500",
										"price.500_1000",
										"price.1000_2000",
										"price.above_2000",
									].map((pKey) => (
										<div key={pKey} className="flex items-center">
											<Checkbox id={pKey} />
											<label htmlFor={pKey} className="ml-2 text-sm cursor-pointer">
												{t(pKey)}
											</label>
										</div>
									))}
								</div>
							</div>

							{/* Suitable For */}
							<div className="mb-6">
								<Label className="mb-3 block font-semibold">
									{t("suitable_for") ?? "Suitable For"}
								</Label>
								<div className="space-y-3">
									{[
										"suitable.families",
										"suitable.couples",
										"suitable.groups",
										"suitable.kids",
										"suitable.all_ages",
									].map((sKey) => (
										<div key={sKey} className="flex items-center">
											<Checkbox id={sKey} />
											<label htmlFor={sKey} className="ml-2 text-sm cursor-pointer">
												{t(sKey)}
											</label>
										</div>
									))}
								</div>
							</div>

							<Button variant="outline" className="w-full">
								{t("clear_filters")}
							</Button>
						</div>

						{/* Quick Date Picker */}
						<div className="bg-card rounded-lg p-6 shadow-soft">
							<div className="flex items-center gap-2 mb-4">
								<Calendar className="h-5 w-5 text-primary" />
								<h3 className="font-display font-bold">{t("check_availability") ?? "Check Availability"}</h3>
							</div>
							<Input type="date" className="mb-3" />
							<Button className="w-full">{t("search_dates") ?? "Search Dates"}</Button>
						</div>
					</aside>

					{/* Experiences Grid */}
					<main className="flex-1">
						<div className="mb-6 flex items-center justify-between">
							<p className="text-muted-foreground">
								{t("found_experiences").replace("{n}", String(mockExperiences.length))}
							</p>
							<select className="border rounded-md px-3 py-2 text-sm">
								<option>{t("sort_rating")}</option>
								<option>{t("sort_price")}</option>
								<option>{t("sort_price")}</option>
								<option>{t("distance_km")}</option>
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
