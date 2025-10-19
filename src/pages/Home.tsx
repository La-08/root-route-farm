import { Hero } from "@/components/Hero";
import { FarmCard } from "@/components/FarmCard";
import { ProductCard } from "@/components/ProductCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Shield, Award, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import indianVegetablesImage from "@/assets/indian-vegetables.jpg";
import indianFarmTourImage from "@/assets/indian-farm-tour.jpg";
import indianMangoesImage from "@/assets/indian-mangoes.jpg";
import indianFarmerImage from "@/assets/indian-farmer.jpg";
import indianWomanFarmerImage from "@/assets/indian-woman-farmer.jpg";
import { useEffect, useState } from "react";

const featuredFarms = [
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
];

const seasonalProducts = [
	{
		id: 1,
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
		image: indianVegetablesImage,
		price: 80,
		unit: "bunch",
		inStock: true,
		seasonal: false,
		organic: true,
	},
];

const popularExperiences = [
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
		image: indianVegetablesImage,
		duration: "3 hours",
		price: 750,
		capacity: 15,
		distance: 6.5,
	},
];

// NOTE: titles/descriptions are translation keys so they switch with language
const trustSignals = [
	{ icon: Shield, titleKey: "trust.verified.title", descKey: "trust.verified.desc" },
	{ icon: Truck, titleKey: "trust.delivery.title", descKey: "trust.delivery.desc" },
	{ icon: Award, titleKey: "trust.customers.title", descKey: "trust.customers.desc" },
];

export default function Home() {
	const [, setTick] = useState(0);
	useEffect(() => {
		const h = () => setTick((s) => s + 1);
		window.addEventListener("langchange", h);
		return () => window.removeEventListener("langchange", h);
	}, []);
	type Win = Window & { __i18n?: { t: (k: string) => string } };
	const w = window as Win;
	const t = (k: string) => w.__i18n?.t(k) ?? k;

	const { user } = useAuth();

	return (
		<div className="min-h-screen">
			<Hero />
			{/* How It Works */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
							{t("how_it_works")}
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{t("how_steps_desc")}
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{[
							{
								step: "1",
								title: t("step.discover"),
								description:
									t("step.discover") + " " + t("discover_trusted"),
							},
							{
								step: "2",
								title: t("step.order"),
								description: t("step.order"),
							},
							{
								step: "3",
								title: t("step.enjoy"),
								description: t("step.enjoy"),
							},
						].map((item) => (
							<div
								key={item.step}
								className="text-center p-6 rounded-2xl bg-card hover-lift transition-smooth"
							>
								<div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-display text-2xl font-bold mx-auto mb-4">
									{item.step}
								</div>
								<h3 className="font-display text-xl font-bold mb-2">
									{item.title}
								</h3>
								<p className="text-muted-foreground">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Farms */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="font-display text-3xl font-bold mb-2">
								Featured Farms
							</h2>
							<p className="text-muted-foreground">
								Discover trusted local farmers
							</p>
						</div>
						<Button variant="outline" className="gap-2">
							View All <ArrowRight className="h-4 w-4" />
						</Button>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{featuredFarms.map((farm) => (
							<FarmCard key={farm.id} {...farm} />
						))}
					</div>
				</div>
			</section>

			{/* Seasonal Products */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="font-display text-3xl font-bold mb-2">
								Seasonal Products
							</h2>
							<p className="text-muted-foreground">
								Fresh picks of the season
							</p>
						</div>
						<Button variant="outline" className="gap-2">
							View All <ArrowRight className="h-4 w-4" />
						</Button>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{seasonalProducts.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
				</div>
			</section>

			{/* Popular Experiences */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="font-display text-3xl font-bold mb-2">
								Popular Experiences
							</h2>
							<p className="text-muted-foreground">
								Authentic farm visits and workshops
							</p>
						</div>
						<Button variant="outline" className="gap-2">
							View All <ArrowRight className="h-4 w-4" />
						</Button>
					</div>
					<div className="grid sm:grid-cols-2 gap-6">
						{popularExperiences.map((experience) => (
							<ExperienceCard key={experience.id} {...experience} />
						))}
					</div>
				</div>
			</section>

			{/* Trust Signals */}
			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{trustSignals.map((signal, index) => {
							const Icon = signal.icon;
							return (
								<div key={index} className="text-center">
									<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
										<Icon className="h-8 w-8 text-primary" />
									</div>
									<h3 className="font-display text-xl font-bold mb-2">
										{t(signal.titleKey)}
									</h3>
									<p className="text-muted-foreground">
										{t(signal.descKey)}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 gradient-primary">
				<div className="container mx-auto px-4 text-center">
					<h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
						{t("trust_ready")}
					</h2>
					<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
						{t("trust_sub")}
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" variant="accent" className="text-base">
							{t("order_fresh_produce")}
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-white/10 text-white border-white hover:bg-white hover:text-primary"
						>
							{t("book_farm_experience")}
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 border-t">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="font-display font-bold mb-4">{t("title")}</h3>
							<p className="text-sm text-muted-foreground">
								{t("footer_about")}
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-4">{t("explore")}</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a
										href="#"
										className="hover:text-primary transition-colors"
									>
										{t("discover")}
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-primary transition-colors"
									>
										{t("products")}
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-primary transition-colors"
									>
										{t("experiences")}
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">{t("support")}</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<a
										href="#"
										className="hover:text-primary transition-colors"
									>
										{t("get_updates")}
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-primary transition-colors"
									>
										{t("contact_host")}
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-primary transition-colors"
									>
										{t("profile_information")}
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">{t("newsletter")}</h4>
							<p className="text-sm text-muted-foreground mb-3">
								{t("get_updates")}
							</p>
							<div className="flex gap-2">
								<Input
									placeholder={t("subscribe")}
									className="text-sm"
								/>
								<Button size="sm">{t("subscribe")}</Button>
							</div>
						</div>
					</div>
					<div className="pt-8 border-t text-center text-sm text-muted-foreground">
						{t("copyright")}
					</div>
				</div>
			</footer>
		</div>
	);
}
