import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, Heart, Settings, ChevronRight, Tractor, Shield, Truck, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RoleInfo } from "@/components/RoleInfo";
import strawberriesImage from "@/assets/strawberries.jpg";
import vegetablesImage from "@/assets/vegetables-market.jpg";
import experienceImage from "@/assets/farm-experience.jpg";

const mockOrders = [
	{
		id: "ORD-1001",
		date: "2024-10-08",
		items: [
			{ name: "Organic Strawberries", quantity: 2, unit: "kg" },
			{ name: "Fresh Tomatoes", quantity: 5, unit: "kg" },
		],
		total: 700,
		status: "delivered",
		deliveryDate: "2024-10-10",
		farmName: "Green Valley Farm",
	},
	{
		id: "ORD-1002",
		date: "2024-10-11",
		items: [{ name: "Mixed Greens", quantity: 3, unit: "bunch" }],
		total: 240,
		status: "pending",
		estimatedDelivery: "2024-10-13",
		farmName: "Happy Harvest Farm",
	},
];

const mockBookings = [
	{
		id: "BK-2001",
		experience: "Organic Farm Day Tour",
		farmName: "Green Valley Farm",
		date: "2024-10-20",
		time: "10:00 AM",
		guests: 2,
		total: 1000,
		status: "upcoming",
		image: experienceImage,
	},
];

const savedFarms = [
	{
		id: 1,
		name: "farm.1.name",
		image: strawberriesImage,
		distance: 4.2,
		rating: 4.8,
	},
	{
		id: 2,
		name: "farm.2.name",
		image: vegetablesImage,
		distance: 6.5,
		rating: 4.6,
	},
];

const statusColors = {
	delivered: "success",
	pending: "warning",
	cancelled: "destructive",
	upcoming: "success",
} as const;

export default function Account() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [, setTick] = useState(0);
	useEffect(() => {
		const h = () => setTick((s) => s + 1);
		window.addEventListener("langchange", h);
		return () => window.removeEventListener("langchange", h);
	}, []);
	type Win = Window & { __i18n?: { t: (k: string) => string } };
	const w = window as Win;
	const t = (k: string) => w.__i18n?.t(k) ?? k;

	// Redirect to login if not authenticated
	if (!user) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Please Login</h1>
					<p className="text-muted-foreground mb-6">You need to be logged in to access your account</p>
					<Button onClick={() => navigate('/')}>Go to Home</Button>
				</div>
			</div>
		);
	}

	const getDashboardLink = () => {
		switch (user.role) {
			case 'farmer': return '/farmer/dashboard';
			case 'admin': return '/admin/dashboard';
			case 'delivery': return '/delivery/dashboard';
			default: return null;
		}
	};

	const getDashboardIcon = () => {
		switch (user.role) {
			case 'farmer': return Tractor;
			case 'admin': return Shield;
			case 'delivery': return Truck;
			default: return User;
		}
	};

	const getRoleLabel = () => {
		switch (user.role) {
			case 'farmer': return 'Farmer Dashboard';
			case 'admin': return 'Admin Dashboard';
			case 'delivery': return 'Delivery Dashboard';
			default: return 'Customer Account';
		}
	};

	const dashboardLink = getDashboardLink();
	const DashboardIcon = getDashboardIcon();

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="bg-card rounded-lg p-8 shadow-soft mb-8">
					<div className="flex items-center gap-4">
						<div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center text-white font-display text-3xl font-bold">
							{user.name?.charAt(0).toUpperCase() || 'U'}
						</div>
						<div className="flex-1">
							<h1 className="font-display text-3xl font-bold mb-1">
								{user.name}
							</h1>
							<p className="text-muted-foreground">
								{user.email}
							</p>
							<Badge variant="outline" className="mt-2 capitalize">
								{user.role}
							</Badge>
						</div>
						{dashboardLink && (
							<Button onClick={() => navigate(dashboardLink)} className="gap-2">
								<DashboardIcon className="h-4 w-4" />
								{getRoleLabel()}
							</Button>
						)}
					</div>
				</div>

				{/* Role-specific dashboard preview */}
				{dashboardLink && (
					<Card className="mb-8">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<DashboardIcon className="h-5 w-5" />
								{getRoleLabel()}
							</CardTitle>
							<CardDescription>
								{user.role === 'farmer' && "Manage your farm, products, and orders"}
								{user.role === 'admin' && "Oversee platform operations and user management"}
								{user.role === 'delivery' && "Track deliveries and manage your route"}
								{user.role === 'customer' && "Manage your orders and bookings"}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button onClick={() => navigate(dashboardLink)} className="w-full">
								Go to Dashboard
							</Button>
						</CardContent>
					</Card>
				)}

				{/* Tabs for customer account */}
				{user.role === 'customer' && (
				<Tabs defaultValue="orders" className="w-full">
					<TabsList className="mb-8">
						<TabsTrigger value="orders" className="gap-2">
							<Package className="h-4 w-4" />
							{t("orders")}
						</TabsTrigger>
						<TabsTrigger value="bookings" className="gap-2">
							<Calendar className="h-4 w-4" />
							{t("bookings")}
						</TabsTrigger>
						<TabsTrigger value="saved" className="gap-2">
							<Heart className="h-4 w-4" />
							{t("saved")}
						</TabsTrigger>
						<TabsTrigger value="settings" className="gap-2">
							<Settings className="h-4 w-4" />
							{t("settings")}
						</TabsTrigger>
					</TabsList>

					{/* Orders Tab */}
					<TabsContent value="orders">
						<div className="space-y-4">
							{mockOrders.map((order) => (
								<div
									key={order.id}
									className="bg-card rounded-lg p-6 shadow-soft hover-lift transition-smooth"
								>
									<div className="flex items-start justify-between mb-4">
										<div>
											<div className="flex items-center gap-3 mb-2">
												<h3 className="font-display text-xl font-bold">
													Order #{order.id}
												</h3>
												<Badge
													variant={statusColors[order.status]}
													className="capitalize"
												>
													{order.status}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">
												Placed on{" "}
												{new Date(order.date).toLocaleDateString()}
											</p>
											<p className="text-sm text-muted-foreground">
												{order.farmName}
											</p>
										</div>
										<p className="text-2xl font-bold text-primary">
											₹{order.total}
										</p>
									</div>

									<Separator className="my-4" />

									<div className="space-y-2 mb-4">
										{order.items.map((item, idx) => (
											<div
												key={idx}
												className="flex justify-between text-sm"
											>
												<span className="text-muted-foreground">
													{item.name}
												</span>
												<span className="font-semibold">
													{item.quantity} {item.unit}
												</span>
											</div>
										))}
									</div>

									{order.status === "delivered" && (
										<p className="text-sm text-success mb-4">
											Delivered on{" "}
											{new Date(order.deliveryDate!).toLocaleDateString()}
										</p>
									)}
									{order.status === "pending" && (
										<p className="text-sm text-warning mb-4">
											Estimated delivery:{" "}
											{new Date(order.estimatedDelivery!).toLocaleDateString()}
										</p>
									)}

									<div className="flex gap-3">
										<Button variant="outline" size="sm">
											{t("view_details_short")}
										</Button>
										{order.status === "delivered" && (
											<Button variant="outline" size="sm">
												{t("leave_review")}
											</Button>
										)}
										{order.status === "pending" && (
											<Button variant="outline" size="sm">
												{t("track_order")}
											</Button>
										)}
									</div>
								</div>
							))}
						</div>
					</TabsContent>

					{/* Bookings Tab */}
					<TabsContent value="bookings">
						<div className="space-y-4">
							{mockBookings.map((booking) => (
								<div
									key={booking.id}
									className="bg-card rounded-lg overflow-hidden shadow-soft hover-lift transition-smooth"
								>
									<div className="flex">
										<img
											src={booking.image}
											alt={booking.experience}
											className="h-48 w-48 object-cover"
										/>
										<div className="flex-1 p-6">
											<div className="flex items-start justify-between mb-4">
												<div>
													<div className="flex items-center gap-3 mb-2">
														<h3 className="font-display text-xl font-bold">
															{booking.experience}
														</h3>
														<Badge
															variant={
																statusColors[
																	booking.status
																]
															}
															className="capitalize"
														>
															{booking.status}
														</Badge>
													</div>
													<p className="text-sm text-muted-foreground mb-1">
														{booking.farmName}
													</p>
													<p className="text-sm text-muted-foreground">
														Booking ID: {booking.id}
													</p>
												</div>
												<p className="text-2xl font-bold text-primary">
													₹{booking.total}
												</p>
											</div>

											<Separator className="my-4" />

											<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
												<div>
													<p className="text-muted-foreground mb-1">
														Date
													</p>
													<p className="font-semibold">
														{new Date(
															booking.date
														).toLocaleDateString()}
													</p>
												</div>
												<div>
													<p className="text-muted-foreground mb-1">
														Time
													</p>
													<p className="font-semibold">
														{booking.time}
													</p>
												</div>
												<div>
													<p className="text-muted-foreground mb-1">
														Guests
													</p>
													<p className="font-semibold">
														{booking.guests} people
													</p>
												</div>
											</div>

											<div className="flex gap-3">
												<Button size="sm">View QR Code</Button>
												<Button variant="outline" size="sm">
													Get Directions
												</Button>
												<Button variant="outline" size="sm">
													Contact Host
												</Button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</TabsContent>

					{/* Saved Farms Tab */}
					<TabsContent value="saved">
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{savedFarms.map((farm) => (
								<Link key={farm.id} to={`/farm/${farm.id}`}>
									<div className="bg-card rounded-lg overflow-hidden shadow-soft hover-lift transition-smooth">
										<img
											src={farm.image}
											alt={farm.name}
											className="h-48 w-full object-cover"
										/>
										<div className="p-4">
											<h3 className="font-display text-lg font-bold mb-2">
												{t(farm.name)}
											</h3>
											<div className="flex items-center justify-between text-sm">
												<span className="text-muted-foreground">
													{farm.distance}km away
												</span>
												<span className="font-semibold">
													{farm.rating} ★
												</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</TabsContent>

					{/* Settings Tab */}
					<TabsContent value="settings">
						<div className="space-y-4">
							{[
								{
									title: "Profile Information",
									description: "Update your personal details",
								},
								{
									title: "Delivery Addresses",
									description: "Manage your saved addresses",
								},
								{
									title: "Payment Methods",
									description: "Add or remove payment options",
								},
								{
									title: "Notifications",
									description: "Configure your preferences",
								},
								{
									title: "Privacy & Security",
									description: "Manage your account security",
								},
							].map((setting, idx) => (
								<button
									key={idx}
									className="w-full bg-card rounded-lg p-6 shadow-soft hover-lift transition-smooth text-left flex items-center justify-between"
								>
									<div>
										<h3 className="font-semibold mb-1">
											{setting.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{setting.description}
										</p>
									</div>
									<ChevronRight className="h-5 w-5 text-muted-foreground" />
								</button>
							))}
						</div>
					</TabsContent>
				</Tabs>
				)}
			</div>
		</div>
	);
}
