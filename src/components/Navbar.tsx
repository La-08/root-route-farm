import { useLocation, useNavigate } from "react-router-dom";
import { Sprout, ShoppingCart, User, Menu, Search, LogOut, Settings, Package, Calendar, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getDashboardPath } from "@/components/ProtectedRoute";

declare global {
	interface Window {
		__i18n?: {
			lang: string;
			translations: Record<string, Record<string, string>>;
			t: (k: string) => string;
		};
	}
}

export function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const { getTotalItems } = useCart();
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const isActive = (path: string) => location.pathname === path;

	// --- Replaced: language state and persistence with global i18n setup ---
	const [lang, setLang] = useState<string>("en");

	// Central translations map. Add more keys as you need across the app.
	const translations: Record<string, Record<string, string>> = {
		en: {
			"title": "Roots & Routes",
			"tagline": "Farm to Table",
			"discover": "Discover Farms",
			"products": "Products",
			"experiences": "Experiences",
			"languageLabel": "Language",
			"cart": "Cart",
			"account": "Account",
			"search": "Search",
			"login": "Login",
			"logout": "Logout",
			"signup": "Sign Up",
			"profile": "Profile",
			"my_orders": "My Orders",
			"my_bookings": "My Bookings",
			"account_settings": "Settings",
			// common UI
			"view_details": "View Details",
			"from_label": "From",
			"per_person": "/person",
			"up_to": "Up to {capacity}",
			"distance_km": "{distance}km",
			"distance_away": "{distance}km away",
			"verified": "Verified",
			"organic": "Organic",
			"seasonal": "Seasonal",
			"out_of_stock": "Out of Stock",
			"add": "Add",
			"added_to_cart": "{name} added to cart!",
			// Hero / Home
			"hero_title": "Discover Fresh from the Farm",
			"hero_tagline": "Connect directly with local farmers for fresh organic produce and authentic farm experiences",
			"hero_search_location": "Enter your location...",
			"hero_search": "Search products or farms...",
			"search_button": "Search",
			"categories.fresh_vegetables": "Fresh Vegetables",
			"categories.fruits": "Fruits",
			"categories.dairy": "Dairy",
			"categories.farm_visits": "Farm Visits",
			"categories.workshops": "Workshops",
			"categories.farm_stays": "Farm Stays",
			"categories": "Categories",
			// filter option keys
			"type.farm_tours": "Farm Tours",
			"type.workshops": "Workshops",
			"type.farm_stays": "Farm Stays",
			"type.cooking_classes": "Cooking Classes",
			"type.family_activities": "Family Activities",
			"duration.2_3": "2-3 hours",
			"duration.4_5": "4-5 hours",
			"duration.full_day": "Full day",
			"duration.overnight": "Overnight",
			"duration.weekend": "Weekend",
			"price.under_500": "Under ₹500",
			"price.500_1000": "₹500 - ₹1000",
			"price.1000_2000": "₹1000 - ₹2000",
			"price.above_2000": "Above ₹2000",
			"suitable.families": "Families",
			"suitable.couples": "Couples",
			"suitable.groups": "Groups",
			"suitable.kids": "Kids",
			"suitable.all_ages": "All Ages",
			"chemical_free": "Chemical-Free",
			// Cart
			"cart_empty_title": "Your cart is empty",
			"cart_empty_sub": "Start adding some fresh produce!",
			"browse_products": "Browse Products",
			"shopping_cart": "Shopping Cart",
			"order_summary": "Order Summary",
			"subtotal": "Subtotal",
			"delivery_fee": "Delivery Fee",
			"free": "FREE",
			"add_for_free_delivery": "Add ₹{amount} more for free delivery",
			"total": "Total",
			"promo_code": "Promo code",
			"apply": "Apply",
			"proceed_to_checkout": "Proceed to Checkout",
			"continue_shopping": "Continue Shopping",
			// Discover / Filters / Sorts
			"filters": "Filters",
			"clear_filters": "Clear Filters",
			"sort_distance": "Sort by Distance",
			"sort_rating": "Sort by Rating",
			"sort_price": "Sort by Price",
			"sort_newest": "Sort by Newest",
			"found_farms": "Found {n} farms",
			"found_experiences": "Found {n} experiences",
			"showing_products": "Showing {n} products",
			// Experiences / Products headings
			"farm_experiences": "Farm Experiences",
			"available_products": "Available Products",
			"fresh_produce": "Fresh produce from our farm",
			// Product Detail
			"description": "Description",
			"nutritional_benefits": "Nutritional Benefits",
			"quantity_label": "Quantity (kg)",
			"total_label": "Total",
			"delivery_options": "Delivery Options",
			"home_delivery": "Home Delivery Available",
			"farm_pickup": "Farm Pickup Available",
			"subscription": "Subscribe for Weekly Delivery",
			"add_to_cart": "Add to Cart - ₹{price}",
			"similar_products": "Similar Products",
			// Home: how it works + CTA + footer
			"how_it_works": "How It Works",
			"how_steps_desc": "Connect with local farmers in three simple steps",
			"step.discover": "Discover",
			"step.order": "Order or Book",
			"step.enjoy": "Enjoy",
			"featured_farms": "Featured Farms",
			"discover_trusted": "Discover trusted local farmers",
			"seasonal_products": "Seasonal Products",
			"trust_ready": "Ready to Experience Farm-Fresh Living?",
			"trust_sub": "Join thousands of customers enjoying fresh produce and authentic farm experiences",
			"order_fresh_produce": "Order Fresh Produce",
			"book_farm_experience": "Book Farm Experience",
			"footer_about": "Connecting farmers and customers for a sustainable future.",
			"explore": "Explore",
			"support": "Support",
			"newsletter": "Newsletter",
			"get_updates": "Get updates on seasonal produce",
			"subscribe": "Subscribe",
			"copyright": "© 2024 Roots & Routes. All rights reserved.",
			// NotFound
			"404_title": "404",
			"404_message": "Oops! Page not found",
			"return_home": "Return to Home",
			// Account / Tabs / Orders / Bookings / Settings
			"orders": "Orders",
			"bookings": "Bookings",
			"saved": "Saved",
			"settings": "Settings",
			"view_details_short": "View Details",
			"leave_review": "Leave Review",
			"track_order": "Track Order",
			"contact_host": "Contact Host",
			"profile_information": "Profile Information",
			"delivery_addresses": "Delivery Addresses",
			"payment_methods": "Payment Methods",
			"notifications": "Notifications",
			"privacy_security": "Privacy & Security",
			// categories & options
			"category.vegetables": "Vegetables",
			"category.fruits": "Fruits",
			"category.dairy": "Dairy",
			"category.grains": "Grains",
			"category.honey": "Honey",
			"category.spices": "Spices",
			"option.in_stock": "In Stock",
			"option.seasonal": "Seasonal",
			"option.preorder": "Pre-order",
			"delivery.home": "Home Delivery",
			"delivery.pickup": "Farm Pickup",
			"delivery.subscription": "Subscription",
			"experience_type": "Experience Type",
			"duration": "Duration",
			"price_range": "Price Range",
			"suitable_for": "Suitable For",
			"check_availability": "Check Availability",
			"search_dates": "Search Dates",
			"by_farmer": "by {farmer}",
			// mock products / farms / experiences (english)
			"product.1.name": "Organic Strawberries",
			"product.2.name": "Fresh Tomatoes",
			"product.3.name": "Mixed Greens",
			"product.4.name": "Alphonso Mangoes",
			"product.5.name": "Fresh Okra (Bhindi)",
			"product.6.name": "Green Chilies",
			"product.7.name": "Fresh Coriander",
			"product.8.name": "Organic Brinjal",
			"farm.1.name": "Green Valley Organic Farm",
			"farm.2.name": "Sunrise Vegetables",
			"farm.3.name": "Happy Harvest Farm",
			"farm.4.name": "Fresh Fields Cooperative",
			"farm.5.name": "Nature's Bounty Farm",
			"farm.6.name": "Organic Oasis",
			"experience.1.title": "Organic Farm Day Tour",
			"experience.2.title": "Farm to Table Workshop",
			"experience.3.title": "Traditional Farming Experience",
			"experience.4.title": "Organic Cooking Workshop",
			"experience.5.title": "Farm Stay Weekend",
			"experience.6.title": "Dairy Farm Visit",
			// cart/order items
			"product.strawberries": "Organic Strawberries",
			"product.tomatoes": "Fresh Tomatoes",
			// Trust signals
			"trust.verified.title": "500+ Verified Farms",
			"trust.verified.desc": "All farms are verified for quality and authenticity",
			"trust.delivery.title": "Fresh Delivery",
			"trust.delivery.desc": "Farm-fresh produce delivered to your doorstep",
			"trust.customers.title": "10,000+ Happy Customers",
			"trust.customers.desc": "Join thousands of satisfied customers",
			// New features
			"farmer_dashboard": "Farmer Dashboard",
			"delivery_dashboard": "Delivery Dashboard",
			"admin_dashboard": "Admin Dashboard",
			"customer_dashboard": "Customer Dashboard",
			"manage_products": "Manage Products",
			"add_product": "Add Product",
			"inventory_management": "Inventory Management",
			"order_management": "Order Management",
			"delivery_management": "Delivery Management",
			"user_management": "User Management",
			"analytics": "Analytics",
			"reports": "Reports",
			"system_notifications": "System Notifications",
			"subscription_management": "Subscription Management",
			"payment_history": "Payment History",
			"farmer_verification": "Farmer Verification",
			"quality_control": "Quality Control",
			"seasonal_planning": "Seasonal Planning",
			"weather_updates": "Weather Updates",
			"market_prices": "Market Prices",
			"farming_tips": "Farming Tips",
			"community": "Community",
			"help_support": "Help & Support",
			"live_chat": "Live Chat",
			"faq": "FAQ",
			"contact_us": "Contact Us",
			"about_us": "About Us",
			"our_story": "Our Story",
			"mission": "Mission",
			"vision": "Vision",
			"team": "Team",
			"careers": "Careers",
			"press": "Press",
			"blog": "Blog",
			"sustainability": "Sustainability",
			"organic_certification": "Organic Certification",
			"environmental_impact": "Environmental Impact",
			"carbon_footprint": "Carbon Footprint",
			"waste_reduction": "Waste Reduction",
			"water_conservation": "Water Conservation",
			"soil_health": "Soil Health",
			"biodiversity": "Biodiversity",
			"fair_trade": "Fair Trade",
			"farmer_welfare": "Farmer Welfare",
			"community_development": "Community Development",
			"education_programs": "Education Programs",
			"research_development": "Research & Development",
			"innovation": "Innovation",
			"technology": "Technology",
			"mobile_app": "Mobile App",
			"api_access": "API Access",
			"integration": "Integration",
			"partnerships": "Partnerships",
			"affiliate_program": "Affiliate Program",
			"referral_program": "Referral Program",
			"loyalty_program": "Loyalty Program",
			"rewards": "Rewards",
			"gift_cards": "Gift Cards",
			"corporate_sales": "Corporate Sales",
			"bulk_orders": "Bulk Orders",
			"wholesale": "Wholesale",
			"restaurant_supply": "Restaurant Supply",
			"school_programs": "School Programs",
			"institutional_sales": "Institutional Sales",
			// Status and alerts
			"status_active": "Active",
			"status_inactive": "Inactive",
			"status_pending": "Pending",
			"status_completed": "Completed",
			"status_cancelled": "Cancelled",
			"status_in_progress": "In Progress",
			"status_delivered": "Delivered",
			"status_shipped": "Shipped",
			"status_processing": "Processing",
			"status_verified": "Verified",
			"status_unverified": "Unverified",
			"low_stock_alert": "Low Stock Alert",
			"stock_out": "Out of Stock",
			"stock_in": "In Stock",
			"restock_needed": "Restock Needed",
			"harvest_ready": "Harvest Ready",
			"planting_season": "Planting Season",
			// Dashboard specific
			"dashboard_overview": "Overview",
			"recent_activity": "Recent Activity",
			"quick_stats": "Quick Stats",
			"top_products": "Top Products",
			"revenue_summary": "Revenue Summary",
			"customer_feedback": "Customer Feedback",
			"delivery_schedule": "Delivery Schedule",
			"route_optimization": "Route Optimization",
			"earnings_tracker": "Earnings Tracker",
			"performance_metrics": "Performance Metrics",
			"inventory_alerts": "Inventory Alerts",
			"sales_trends": "Sales Trends",
			"market_insights": "Market Insights",
			"crop_calendar": "Crop Calendar",
			"farm_management": "Farm Management",
			"soil_testing": "Soil Testing",
			"pest_control": "Pest Control",
			"irrigation_schedule": "Irrigation Schedule",
			"harvest_planning": "Harvest Planning",
			"storage_management": "Storage Management",
			"transportation": "Transportation",
			"packaging": "Packaging",
			"labeling": "Labeling",
			"traceability": "Traceability",
			// Home / sections
			"popular_experiences": "Popular Experiences",
			"popular_experiences_sub": "Authentic farm visits and workshops",
			"seasonal_tagline": "Fresh picks of the season",
			// FarmProfile small labels
			"meet_the_farmer": "Meet the Farmer",
			"quick_info": "Quick Info",
			"farming_practices": "Farming Practices",
			"farm_owner": "Farm Owner",
			"distance_label": "Distance",
			"established_label": "Established",
			"rating_label": "Rating",
			"customer_reviews": "Customer Reviews",
			"location_label": "Location",
			"get_directions": "Get Directions",
			"organic_certified": "Organic Certified",
			"map_coming_soon": "Map view coming soon",
			// farming practices
			"practice.organic": "100% organic, no synthetic pesticides or fertilizers",
			"practice.crop_rotation": "Crop rotation and companion planting",
			"practice.water_harvesting": "Rainwater harvesting and drip irrigation",
			"practice.compost": "Compost-based soil enrichment",
			// FAQ page translations
			"faq.title": "Frequently Asked Questions",
			"faq.subtitle": "Find answers to common questions about Roots & Routes",
			"faq.general.what_is": "What is Roots & Routes?",
			"faq.general.what_is_answer": "Roots & Routes is a farm-to-table marketplace that connects customers directly with local farmers for fresh organic produce and authentic farm experiences.",
			"faq.general.how_order": "How do I place an order?",
			"faq.general.how_order_answer": "Simply browse our products, add items to your cart, and proceed to checkout. You can choose between home delivery or farm pickup options.",
			"faq.general.payment_methods": "What payment methods do you accept?",
			"faq.general.payment_methods_answer": "We accept all major credit cards, debit cards, UPI payments, and cash on delivery for selected areas.",
			"faq.farmer.become": "How can I become a farmer on your platform?",
			"faq.farmer.become_answer": "Sign up as a farmer, complete the verification process including farm documentation and quality certification. Our team will review and approve your application within 5-7 business days.",
			"faq.farmer.commission": "What are the commission rates for farmers?",
			"faq.farmer.commission_answer": "We charge a competitive commission of 15-20% depending on the product category and volume. This includes marketing, payment processing, and customer support.",
			"faq.delivery.become": "How can I become a delivery partner?",
			"faq.delivery.become_answer": "Register as a delivery partner, provide vehicle documentation and complete our training program. You can start earning immediately after approval.",
			"faq.delivery.earnings": "What are the delivery partner earnings?",
			"faq.delivery.earnings_answer": "Delivery partners earn ₹15-25 per km plus incentives based on customer ratings and delivery efficiency. Weekly payouts available.",
			"faq.customer.freshness": "How fresh are the products?",
			"faq.customer.freshness_answer": "All products are harvested within 24-48 hours of delivery. We maintain cold chain logistics to ensure maximum freshness.",
			"faq.customer.satisfaction": "What if I'm not satisfied with my order?",
			"faq.customer.satisfaction_answer": "We offer 100% satisfaction guarantee. Contact us within 24 hours of delivery for refund or replacement.",
			"faq.need_help": "Still need help?",
			"faq.contact_support": "Contact our support team",
			// Sustainability page translations
			"sustainability.title": "Our Commitment to Sustainability",
			"sustainability.subtitle": "Building a greener future through sustainable farming and responsible business practices",
			"sustainability.carbon_neutral": "Carbon Neutral Deliveries",
			"sustainability.carbon_neutral_desc": "of our deliveries use electric or eco-friendly vehicles",
			"sustainability.water_conservation": "Water Conservation",
			"sustainability.water_conservation_desc": "reduction in water usage through efficient farming",
			"sustainability.waste_reduction": "Waste Reduction",
			"sustainability.waste_reduction_desc": "less packaging waste with reusable containers",
			"sustainability.farmer_welfare": "Farmer Welfare",
			"sustainability.farmer_welfare_desc": "farmers supported with fair trade practices",
			"sustainability.certifications": "Our Certifications",
			"sustainability.initiatives": "Sustainability Initiatives",
			"sustainability.regenerative_farming": "Regenerative Farming",
			"sustainability.regenerative_farming_desc": "Supporting farmers in adopting regenerative agriculture practices that restore soil health and biodiversity.",
			"sustainability.zero_waste": "Zero Waste Packaging",
			"sustainability.zero_waste_desc": "Implementing returnable and biodegradable packaging solutions to minimize environmental impact.",
			"sustainability.solar_powered": "Solar Powered Facilities",
			"sustainability.solar_powered_desc": "Our warehouses and processing facilities run on renewable solar energy.",
			"sustainability.education": "Farmer Education",
			"sustainability.education_desc": "Training programs on sustainable farming, organic practices, and modern technology.",
			"sustainability.community_dev": "Community Development",
			"sustainability.community_dev_desc": "Building schools, healthcare facilities, and infrastructure in farming communities.",
			// Blog page translations
			"blog.title": "Farm Stories & Updates",
			"blog.subtitle": "Stay updated with latest farming trends, seasonal tips, and community stories",
			"blog.featured": "Featured Stories",
			"blog.latest": "Latest Posts",
			"blog.categories": "Categories",
			"blog.read_more": "Read More",
			"blog.share": "Share",
			"blog.related": "Related Posts",
			"blog.author": "Author",
			"blog.published": "Published",
			"blog.tags": "Tags",
			// Contact page translations
			"contact.title": "Get in Touch",
			"contact.subtitle": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
			"contact.name": "Your Name",
			"contact.email": "Email Address",
			"contact.phone": "Phone Number",
			"contact.subject": "Subject",
			"contact.message": "Message",
			"contact.send": "Send Message",
			"contact.office_hours": "Office Hours",
			"contact.address": "Address",
			"contact.emergency": "Emergency Support",
			"contact.follow_us": "Follow Us",
			// Navigation and menu items
			"nav.home": "Home",
			"nav.about": "About",
			"nav.farmers": "For Farmers",
			"nav.delivery": "For Delivery Partners",
			"nav.customers": "For Customers",
			"nav.how_it_works": "How It Works",
			"nav.pricing": "Pricing",
			"nav.support": "Support",
			"nav.blog": "Blog",
			"nav.careers": "Careers",
			"nav.press": "Press",
			"nav.partnerships": "Partnerships",
			"nav.affiliate": "Affiliate Program",
			"nav.terms": "Terms of Service",
			"nav.privacy": "Privacy Policy",
			"nav.legal": "Legal",
			"nav.feedback": "Feedback",
			"nav.sitemap": "Sitemap",
			// Additional missing translations
			"sort_by": "Sort by",
			"active_filters": "Active filters",
			"no_products_found": "No products found",
			"adjust_filters": "Try adjusting your filters or search terms",
			"loading": "Loading...",
			"error": "Error",
			"retry": "Retry",
			"save": "Save",
			"cancel": "Cancel",
			"edit": "Edit",
			"delete": "Delete",
			"confirm": "Confirm",
			"yes": "Yes",
			"no": "No",
			"close": "Close",
			"open": "Open",
			"view": "View",
			"download": "Download",
			"upload": "Upload",
			"next": "Next",
			"previous": "Previous",
			"first": "First",
			"last": "Last",
			"page": "Page",
			"of": "of",
			"items": "items",
			"per_page": "per page",
			"show_more": "Show More",
			"show_less": "Show Less",
			"expand": "Expand",
			"collapse": "Collapse",
			"select_all": "Select All",
			"deselect_all": "Deselect All",
			"bulk_actions": "Bulk Actions",
			"export": "Export",
			"import": "Import",
			"print": "Print",
			"refresh": "Refresh",
			"reset": "Reset",
			"undo": "Undo",
			"redo": "Redo",
			"copy": "Copy",
			"paste": "Paste",
			"cut": "Cut",
			"success": "Success",
			"warning": "Warning",
			"info": "Information",
			"required": "Required",
			"optional": "Optional",
			"recommended": "Recommended",
			"available": "Available",
			"unavailable": "Unavailable",
			"active": "Active",
			"inactive": "Inactive",
			"enabled": "Enabled",
			"disabled": "Disabled",
			"public": "Public",
			"private": "Private",
			"draft": "Draft",
			"published": "Published",
			"pending": "Pending",
			"approved": "Approved",
			"rejected": "Rejected",
			"new": "New",
			"updated": "Updated",
			"created": "Created",
			"modified": "Modified",
			"deleted": "Deleted",
			"archived": "Archived",
			"restored": "Restored",
		},
		hi: {
			"title": "रूट्स और रूट्स",
			"tagline": "खेत से मेज तक",
			"discover": "खेती खोजें",
			"products": "उत्पाद",
			"experiences": "अनुभव",
			"languageLabel": "भाषा",
			"cart": "कार्ट",
			"account": "खाता",
			"search": "खोजें",
			"view_details": "विवरण देखें",
			"from_label": "प्रति",
			"per_person": "/व्यक्ति",
			"up_to": "{capacity} तक",
			"distance_km": "{distance}किमी",
			"distance_away": "{distance}किमी दूर",
			"verified": "सत्यापित",
			"organic": "ऑर्गेनिक",
			"seasonal": "सीज़नल",
			"out_of_stock": "स्टॉक में नहीं",
			"add": "जोड़ें",
			"added_to_cart": "{name} कार्ट में जोड़ा गया!",
			"hero_title": "खेती से ताज़ा खोजें",
			"hero_tagline": "ताज़ा ऑर्गेनिक उत्पादों और असली फार्म अनुभवों के लिए स्थानीय किसानों से सीधे जुड़ें",
			"hero_search_location": "अपना स्थान दर्ज करें...",
			"hero_search": "उत्पाद या खेत खोजें...",
			"search_button": "खोजें",
			"categories.fresh_vegetables": "ताज़ी सब्जियाँ",
			"categories.fruits": "फल",
			"categories.dairy": "डेयरी",
			"categories.farm_visits": "फार्म विज़िट",
			"categories.workshops": "कार्यशालाएँ",
			"categories.farm_stays": "फार्म स्टे",
			"categories": "श्रेणियाँ",
			// filter option keys
			"type.farm_tours": "फ़ार्म टूर",
			"type.workshops": "कार्यशालाएँ",
			"type.farm_stays": "फार्म स्टे",
			"type.cooking_classes": "कुकिंग क्लासेस",
			"type.family_activities": "पारिवारिक गतिविधियाँ",
			"duration.2_3": "2-3 घंटे",
			"duration.4_5": "4-5 घंटे",
			"duration.full_day": "पूरा दिन",
			"duration.overnight": "रात भर",
			"duration.weekend": "सप्ताहांत",
			"price.under_500": "₹500 से कम",
			"price.500_1000": "₹500 - ₹1000",
			"price.1000_2000": "₹1000 - ₹2000",
			"price.above_2000": "₹2000 से ऊपर",
			"suitable.families": "परिवार",
			"suitable.couples": "जोड़े",
			"suitable.groups": "समूह",
			"suitable.kids": "बच्चे",
			"suitable.all_ages": "सभी आयु वर्ग",
			"chemical_free": "रासायनिक मुक्त",
			// Cart
			"cart_empty_title": "आपकी कार्ट खाली है",
			"cart_empty_sub": "कुछ ताज़ा जोड़ना शुरू करें!",
			"browse_products": "उत्पाद ब्राउज़ करें",
			"shopping_cart": "शॉपिंग कार्ट",
			"order_summary": "ऑर्डर सारांश",
			"subtotal": "उप-योग",
			"delivery_fee": "डिलीवरी शुल्क",
			"free": "मुफ़्त",
			"add_for_free_delivery": "मुफ़्त डिलीवरी के लिए और ₹{amount} जोड़ें",
			"total": "कुल",
			"promo_code": "प्रमो कोड",
			"apply": "लागू करें",
			"proceed_to_checkout": "चेकआउट पर जाएं",
			"continue_shopping": "खरीदारी जारी रखें",
			// Discover / Filters / Sorts
			"filters": "फ़िल्टर",
			"clear_filters": "फ़िल्टर साफ़ करें",
			"sort_distance": "दूरी के अनुसार छांटें",
			"sort_rating": "रेटिंग के अनुसार छांटें",
			"sort_price": "मूल्य के अनुसार छांटें",
			"sort_newest": "नवीनतम के अनुसार छांटें",
			"found_farms": "{n} खेत मिले",
			"found_experiences": "{n} अनुभव मिले",
			"showing_products": "{n} उत्पाद दिखा रहा है",
			"farm_experiences": "फार्म अनुभव",
			"available_products": "उपलब्ध उत्पाद",
			"fresh_produce": "हमारे खेत से ताज़ा उत्पादन",
			"description": "विवरण",
			"nutritional_benefits": "पोषण संबंधी लाभ",
			"quantity_label": "मात्रा (किग्रा)",
			"total_label": "कुल",
			"delivery_options": "डिलीवरी विकल्प",
			"home_delivery": "होम डिलीवरी उपलब्ध",
			"farm_pickup": "फार्म पिकअप उपलब्ध",
			"subscription": "साप्ताहिक डिलीवरी के लिए सदस्यता लें",
			"add_to_cart": "कार्ट में जोड़ें - ₹{price}",
			"similar_products": "समान उत्पाद",
			"how_it_works": "यह कैसे काम करता है",
			"how_steps_desc": "स्थानीय किसानों से तीन आसान चरणों में जुड़ें",
			"step.discover": "खोजें",
			"step.order": "ऑर्डर या बुक करें",
			"step.enjoy": "आनंद लें",
			"featured_farms": "विशेष रुप से प्रदर्शित खेत",
			"discover_trusted": "विश्वसनीय स्थानीय किसानों को खोजें",
			"seasonal_products": "सीज़नल उत्पाद",
			"trust_ready": "फार्म-ताज़ा जीवन का अनुभव करने के लिए तैयार?",
			"trust_sub": "हजारों ग्राहकों में शामिल हों जो ताज़ा उत्पादन और वास्तविक फार्म अनुभवों का आनंद लेते हैं",
			"order_fresh_produce": "ताज़ा उत्पादन ऑर्डर करें",
			"book_farm_experience": "फार्म अनुभव बुक करें",
			"footer_about": "एक टिकाऊ भविष्य के लिए किसानों और ग्राहकों को जोड़ना।",
			"explore": "अन्वेषण करें",
			"support": "समर्थन",
			"newsletter": "समाचार पत्र",
			"get_updates": "मौसमी उत्पादों पर अपडेट प्राप्त करें",
			"subscribe": "सदस्यता लें",
			"copyright": "© 2024 रूट्स & रूट्स। सर्वाधिकार सुरक्षित।",
			// NotFound
			"404_title": "404",
			"404_message": "उफ़! पृष्ठ नहीं मिला",
			"return_home": "मुख पृष्ठ पर लौटें",
			"orders": "ऑर्डर",
			"bookings": "बुकिंग",
			"saved": "सहेजा हुआ",
			"settings": "सेटिंग्स",
			"view_details_short": "विवरण देखें",
			"leave_review": "समीक्षा छोड़ें",
			"track_order": "ऑर्डर ट्रैक करें",
			"contact_host": "होस्ट से संपर्क करें",
			"profile_information": "प्रोफ़ाइल जानकारी",
			"delivery_addresses": "डिलीवरी पते",
			"payment_methods": "भुगतान विधियाँ",
			"notifications": "सूचनाएँ",
			"privacy_security": "गोपनीयता और सुरक्षा",
			// categories & options
			"category.vegetables": "सब्जियाँ",
			"category.fruits": "फल",
			"category.dairy": "डेयरी",
			"category.grains": "अनाज",
			"category.honey": "शहद",
			"category.spices": "मसाले",
			"option.in_stock": "स्टॉक में",
			"option.seasonal": "सीज़नल",
			"option.preorder": "पूर्व-ऑर्डर",
			"delivery.home": "होम डिलीवरी",
			"delivery.pickup": "फार्म पिकअप",
			"delivery.subscription": "सदस्यता",
			"experience_type": "अनुभव का प्रकार",
			"duration": "अवधि",
			"price_range": "मूल्य सीमा",
			"suitable_for": "उपयुक्त",
			"check_availability": "उपलब्धता जांचें",
			"search_dates": "तिथियाँ खोजें",
			"by_farmer": "{farmer} द्वारा",
			// mock products / farms / experiences (english)
			"product.1.name": "ऑर्गेनिक स्ट्रॉबेरी",
			"product.2.name": "ताज़े टमाटर",
			"product.3.name": "मिक्स्ड ग्रीन्स",
			"product.4.name": "अल्फांसो आम",
			"product.5.name": "ताज़ी भिंडी",
			"product.6.name": "हरी मिर्च",
			"product.7.name": "ताज़ा धनिया",
			"product.8.name": "ऑर्गेनिक बैंगन",
			"farm.1.name": "ग्रीन वैली ऑर्गेनिक फ़ार्म",
			"farm.2.name": "सनराइज वेजिटेबल्स",
			"farm.3.name": "हैप्पी हार्वेस्ट फ़ार्म",
			"farm.4.name": "फ्रेश फ़ील्ड्स कोऑपरेटिव",
			"farm.5.name": "नेचर बाउंटी फ़ार्म",
			"farm.6.name": "ऑर्गेनिक ओएसिस",
			"experience.1.title": "ऑर्गेनिक फ़ार्म डे टूर",
			"experience.2.title": "फार्म टू टेबल वर्कशॉप",
			"experience.3.title": "पारंपरिक खेती का अनुभव",
			"experience.4.title": "ऑर्गेनिक कुकिंग वर्कशॉप",
			"experience.5.title": "फार्म स्टे वीकेंड",
			"experience.6.title": "डेयरी फ़ार्म विज़िट",
			// New features in Hindi
			"farmer_dashboard": "किसान डैशबोर्ड",
			"delivery_dashboard": "डिलीवरी डैशबोर्ड",
			"admin_dashboard": "एडमिन डैशबोर्ड",
			"customer_dashboard": "ग्राहक डैशबोर्ड",
			"manage_products": "उत्पाद प्रबंधन",
			"add_product": "उत्पाद जोड़ें",
			"inventory_management": "इन्वेंटरी प्रबंधन",
			"order_management": "ऑर्डर प्रबंधन",
			"delivery_management": "डिलीवरी प्रबंधन",
			"user_management": "उपयोगकर्ता प्रबंधन",
			"analytics": "एनालिटिक्स",
			"reports": "रिपोर्ट्स",
			"system_notifications": "सिस्टम नोटिफिकेशन",
			"subscription_management": "सब्सक्रिप्शन प्रबंधन",
			"payment_history": "भुगतान इतिहास",
			"farmer_verification": "किसान सत्यापन",
			"quality_control": "गुणवत्ता नियंत्रण",
			"seasonal_planning": "मौसमी योजना",
			"weather_updates": "मौसम अपडेट",
			"market_prices": "बाजार दर",
			"farming_tips": "खेती के टिप्स",
			"community": "समुदाय",
			"help_support": "सहायता और समर्थन",
			"live_chat": "लाइव चैट",
			"faq": "अक्सर पूछे जाने वाले प्रश्न",
			"contact_us": "हमसे संपर्क करें",
			"about_us": "हमारे बारे में",
			"our_story": "हमारी कहानी",
			"mission": "मिशन",
			"vision": "विजन",
			"team": "टीम",
			"careers": "करियर",
			"press": "प्रेस",
			"blog": "ब्लॉग",
			"sustainability": "स्थिरता",
			"organic_certification": "ऑर्गेनिक प्रमाणपत्र",
			"environmental_impact": "पर्यावरणीय प्रभाव",
			"carbon_footprint": "कार्बन फुटप्रिंट",
			"waste_reduction": "अपशिष्ट कमी",
			"water_conservation": "जल संरक्षण",
			"soil_health": "मिट्टी का स्वास्थ्य",
			"biodiversity": "जैव विविधता",
			"fair_trade": "फेयर ट्रेड",
			"farmer_welfare": "किसान कल्याण",
			"community_development": "सामुदायिक विकास",
			"education_programs": "शिक्षा कार्यक्रम",
			"research_development": "अनुसंधान और विकास",
			"innovation": "नवाचार",
			"technology": "प्रौद्योगिकी",
			"mobile_app": "मोबाइल ऐप",
			"api_access": "API एक्सेस",
			"integration": "एकीकरण",
			"partnerships": "साझेदारी",
			"affiliate_program": "सहयोगी कार्यक्रम",
			"referral_program": "रेफरल कार्यक्रम",
			"loyalty_program": "लॉयल्टी कार्यक्रम",
			"rewards": "पुरस्कार",
			"gift_cards": "गिफ्ट कार्ड",
			"corporate_sales": "कॉर्पोरेट बिक्री",
			"bulk_orders": "बल्क ऑर्डर",
			"wholesale": "होलसेल",
			"restaurant_supply": "रेस्टोरेंट सप्लाई",
			"school_programs": "स्कूल कार्यक्रम",
			"institutional_sales": "संस्थागत बिक्री",
			// Status and alerts in Hindi
			"status_active": "सक्रिय",
			"status_inactive": "निष्क्रिय",
			"status_pending": "लंबित",
			"status_completed": "पूर्ण",
			"status_cancelled": "रद्द",
			"status_in_progress": "प्रगति में",
			"status_delivered": "डिलीवर",
			"status_shipped": "भेजा गया",
			"status_processing": "प्रसंस्करण",
			"status_verified": "सत्यापित",
			"status_unverified": "असत्यापित",
			"low_stock_alert": "कम स्टॉक अलर्ट",
			"stock_out": "स्टॉक खत्म",
			"stock_in": "स्टॉक में",
			"restock_needed": "रीस्टॉक आवश्यक",
			"harvest_ready": "फसल तैयार",
			"planting_season": "बुआई का मौसम",
			// Dashboard specific in Hindi
			"dashboard_overview": "अवलोकन",
			"recent_activity": "हाल की गतिविधि",
			"quick_stats": "त्वरित आंकड़े",
			"top_products": "शीर्ष उत्पाद",
			"revenue_summary": "राजस्व सारांश",
			"customer_feedback": "ग्राहक प्रतिक्रिया",
			"delivery_schedule": "डिलीवरी शेड्यूल",
			"route_optimization": "रूट ऑप्टिमाइजेशन",
			"earnings_tracker": "कमाई ट्रैकर",
			"performance_metrics": "प्रदर्शन मेट्रिक्स",
			"inventory_alerts": "इन्वेंटरी अलर्ट",
			"sales_trends": "बिक्री रुझान",
			"market_insights": "बाजार अंतर्दृष्टि",
			"crop_calendar": "फसल कैलेंडर",
			"farm_management": "खेत प्रबंधन",
			"soil_testing": "मिट्टी परीक्षण",
			"pest_control": "कीट नियंत्रण",
			"irrigation_schedule": "सिंचाई कार्यक्रम",
			"harvest_planning": "फसल योजना",
			"storage_management": "भंडारण प्रबंधन",
			"transportation": "परिवहन",
			"packaging": "पैकेजिंग",
			"labeling": "लेबलिंग",
			"traceability": "ट्रेसेबिलिटी",
			// FAQ page translations in Hindi
			"faq.title": "अक्सर पूछे जाने वाले प्रश्न",
			"faq.subtitle": "रूट्स & रूट्स के बारे में सामान्य प्रश्नों के उत्तर खोजें",
			"faq.general.what_is": "रूट्स & रूट्स क्या है?",
			"faq.general.what_is_answer": "रूट्स & रूट्स एक फार्म-टू-टेबल मार्केटप्लेस है जो ग्राहकों को ताजा जैविक उत्पादों और वास्तविक फार्म अनुभवों के लिए स्थानीय किसानों से सीधे जोड़ता है।",
			"faq.general.how_order": "मैं ऑर्डर कैसे दूं?",
			"faq.general.how_order_answer": "बस हमारे उत्पादों को ब्राउज़ करें, आइटम को अपनी कार्ट में जोड़ें, और चेकआउट पर आगे बढ़ें। आप होम डिलीवरी या फार्म पिकअप विकल्प चुन सकते हैं।",
			"faq.general.payment_methods": "आप कौन से भुगतान तरीके स्वीकार करते हैं?",
			"faq.general.payment_methods_answer": "हम सभी प्रमुख क्रेडिट कार्ड, डेबिट कार्ड, UPI भुगतान, और चुनिंदा क्षेत्रों के लिए कैश ऑन डिलीवरी स्वीकार करते हैं।",
			"faq.farmer.become": "मैं आपके प्लेटफॉर्म पर किसान कैसे बन सकता हूं?",
			"faq.farmer.become_answer": "किसान के रूप में साइन अप करें, फार्म दस्तावेज़ीकरण और गुणवत्ता प्रमाणन सहित सत्यापन प्रक्रिया पूरी करें। हमारी टीम 5-7 व्यावसायिक दिनों के भीतर आपके आवेदन की समीक्षा और अनुमोदन करेगी।",
			"faq.farmer.commission": "किसानों के लिए कमीशन दरें क्या हैं?",
			"faq.farmer.commission_answer": "हम उत्पाद श्रेणी और मात्रा के आधार पर 15-20% की प्रतिस्पर्धी कमीशन लेते हैं। इसमें मार्केटिंग, भुगतान प्रसंस्करण, और ग्राहक सहायता शामिल है।",
			"faq.delivery.become": "मैं डिलीवरी पार्टनर कैसे बन सकता हूं?",
			"faq.delivery.become_answer": "डिलीवरी पार्टनर के रूप में पंजीकरण करें, वाहन दस्तावेज़ प्रदान करें और हमारा प्रशिक्षण कार्यक्रम पूरा करें। अनुमोदन के बाद आप तुरंत कमाई शुरू कर सकते हैं।",
			"faq.delivery.earnings": "डिलीवरी पार्टनर की कमाई क्या है?",
			"faq.delivery.earnings_answer": "डिलीवरी पार्टनर ग्राहक रेटिंग और डिलीवरी दक्षता के आधार पर ₹15-25 प्रति किमी प्लस प्रोत्साहन कमाते हैं। साप्ताहिक भुगतान उपलब्ध।",
			"faq.customer.freshness": "उत्पाद कितने ताजे हैं?",
			"faq.customer.freshness_answer": "सभी उत्पाद डिलीवरी के 24-48 घंटों के भीतर काटे जाते हैं। हम अधिकतम ताजगी सुनिश्चित करने के लिए कोल्ड चेन लॉजिस्टिक्स बनाए रखते हैं।",
			"faq.customer.satisfaction": "यदि मैं अपने ऑर्डर से संतुष्ट नहीं हूं तो क्या होगा?",
			"faq.customer.satisfaction_answer": "हम 100% संतुष्टि की गारंटी देते हैं। रिफंड या बदलाव के लिए डिलीवरी के 24 घंटों के भीतर हमसे संपर्क करें।",
			"faq.need_help": "अभी भी मदद चाहिए?",
			"faq.contact_support": "हमारी सहायता टीम से संपर्क करें",
			// Sustainability page translations in Hindi
			"sustainability.title": "स्थिरता के लिए हमारी प्रतिबद्धता",
			"sustainability.subtitle": "टिकाऊ खेती और जिम्मेदार व्यावसायिक प्रथाओं के माध्यम से एक हरित भविष्य का निर्माण",
			"sustainability.carbon_neutral": "कार्बन न्यूट्रल डिलीवरी",
			"sustainability.carbon_neutral_desc": "हमारी डिलीवरी इलेक्ट्रिक या पर्यावरण-अनुकूल वाहनों का उपयोग करती है",
			"sustainability.water_conservation": "जल संरक्षण",
			"sustainability.water_conservation_desc": "कुशल खेती के माध्यम से पानी के उपयोग में कमी",
			"sustainability.waste_reduction": "अपशिष्ट कमी",
			"sustainability.waste_reduction_desc": "पुन: उपयोग योग्य कंटेनरों के साथ कम पैकेजिंग अपशिष्ट",
			"sustainability.farmer_welfare": "किसान कल्याण",
			"sustainability.farmer_welfare_desc": "निष्पक्ष व्यापार प्रथाओं के साथ समर्थित किसान",
			"sustainability.certifications": "हमारे प्रमाणपत्र",
			"sustainability.initiatives": "स्थिरता पहल",
			"sustainability.regenerative_farming": "पुनर्जीवित खेती",
			"sustainability.regenerative_farming_desc": "मिट्टी के स्वास्थ्य और जैव विविधता को बहाल करने वाली पुनर्जीवित कृषि प्रथाओं को अपनाने में किसानों का समर्थन।",
			"sustainability.zero_waste": "शून्य अपशिष्ट पैकेजिंग",
			"sustainability.zero_waste_desc": "पर्यावरणीय प्रभाव को कम करने के लिए वापसी योग्य और बायोडिग्रेडेबल पैकेजिंग समाधान लागू करना।",
			"sustainability.solar_powered": "सौर ऊर्जा से चालित सुविधाएं",
			"sustainability.solar_powered_desc": "हमारे गोदाम और प्रसंस्करण सुविधाएं नवीकरणीय सौर ऊर्जा पर चलती हैं।",
			"sustainability.education": "किसान शिक्षा",
			"sustainability.education_desc": "टिकाऊ खेती, जैविक प्रथाओं, और आधुनिक तकनीक पर प्रशिक्षण कार्यक्रम।",
			"sustainability.community_dev": "सामुदायिक विकास",
			"sustainability.community_dev_desc": "कृषि समुदायों में स्कूल, स्वास्थ्य सुविधाएं, और बुनियादी ढांचा निर्माण।",
			// Blog page translations in Hindi
			"blog.title": "फार्म कहानियां और अपडेट",
			"blog.subtitle": "नवीनतम कृषि रुझान, मौसमी टिप्स, और सामुदायिक कहानियों के साथ अपडेट रहें",
			"blog.featured": "विशेष कहानियां",
			"blog.latest": "नवीनतम पोस्ट",
			"blog.categories": "श्रेणियां",
			"blog.read_more": "और पढ़ें",
			"blog.share": "साझा करें",
			"blog.related": "संबंधित पोस्ट",
			"blog.author": "लेखक",
			"blog.published": "प्रकाशित",
			"blog.tags": "टैग",
			// Contact page translations in Hindi
			"contact.title": "संपर्क में रहें",
			"contact.subtitle": "हम आपसे सुनना पसंद करेंगे। हमें एक संदेश भेजें और हम जल्द से जल्द जवाब देंगे।",
			"contact.name": "आपका नाम",
			"contact.email": "ईमेल पता",
			"contact.phone": "फोन नंबर",
			"contact.subject": "विषय",
			"contact.message": "संदेश",
			"contact.send": "संदेश भेजें",
			"contact.office_hours": "कार्यालय के घंटे",
			"contact.address": "पता",
			"contact.emergency": "आपातकालीन सहायता",
			"contact.follow_us": "हमें फॉलो करें",
			// Navigation and menu items in Hindi
			"nav.home": "होम",
			"nav.about": "के बारे में",
			"nav.farmers": "किसानों के लिए",
			"nav.delivery": "डिलीवरी पार्टनर्स के लिए",
			"nav.customers": "ग्राहकों के लिए",
			"nav.how_it_works": "यह कैसे काम करता है",
			"nav.pricing": "मूल्य निर्धारण",
			"nav.support": "सहायता",
			"nav.blog": "ब्लॉग",
			"nav.careers": "करियर",
			"nav.press": "प्रेस",
			"nav.partnerships": "साझेदारी",
			"nav.affiliate": "सहयोगी कार्यक्रम",
			"nav.terms": "सेवा की शर्तें",
			"nav.privacy": "गोपनीयता नीति",
			"nav.legal": "कानूनी",
			"nav.feedback": "प्रतिक्रिया",
			"nav.sitemap": "साइटमैप",
		},
		te: {
			"title": "రూట్స్ & రౌట్స్",
			"tagline": "ఫారం టు టేబుల్",
			"discover": "ఫారమ్‌లు కనుగొనండి",
			"products": "ఉత్పత్తులు",
			"experiences": "అనుభవాలు",
			"languageLabel": "భాష",
			"cart": "కార్టు",
			"account": "ఖాతా",
			"search": "శోధించండి",
			"view_details": "వివరాలు చూడండి",
			"from_label": "నుండి",
			"per_person": "/వ్యక్తి",
			"up_to": "{capacity} వరకు",
			"distance_km": "{distance}కి.మీ",
			"distance_away": "{distance}కి.మీ దూరంలో",
			"verified": "చెలామణి అయ్యింది",
			"organic": "సేంద్రీయ",
			"seasonal": "సీజనల్",
			"out_of_stock": "స్టాక్‌లో లేదు",
			"add": "జోడించు",
			"added_to_cart": "{name} కార్ట్‌లో జత చేయబడింది!",
			"hero_title": "ఫారం నుండి తాజాను కనుగొనండి",
			"hero_tagline": "తాజా సేంద్రీయ ఉత్పత్తులు మరియు అసలైన ఫారమ్ అనుభవాలకు స్థానిక రైతులతో నేరుగా కనెక్ట్ అవ్వండి",
			"hero_search_location": "మీ స్థానం నమోదు చేయండి...",
			"hero_search": "ఉత్పత్తులు లేదా ఫారమ్‌లు సెర్చ్ చేయండి...",
			"search_button": "శోధించండి",
			"categories.fresh_vegetables": "తాజా కూరగాయలు",
			"categories.fruits": "ఫలాలు",
			"categories.dairy": "డైరీ",
			"categories.farm_visits": "ఫారమ్ సందర్శనలు",
			"categories.workshops": "వర్క్‌షాప్స్",
			"categories.farm_stays": "ఫార్మ్ స్టేలు",
			"categories": "వర్గాలు",
			// filter option keys
			"type.farm_tours": "ఫారం టూర్లు",
			"type.workshops": "వర్క్‌షాప్స్",
			"type.farm_stays": "ఫార్మ్ స్టేడ్స్",
			"type.cooking_classes": "వంట తరగతులు",
			"type.family_activities": "కుటుంబ కార్యక్రమాలు",
			"duration.2_3": "2-3 గంటలు",
			"duration.4_5": "4-5 గంటలు",
			"duration.full_day": "పూర్తి రోజు",
			"duration.overnight": "ఒవర్‌నైట్",
			"duration.weekend": "వీకెండ్",
			"price.under_500": "₹500 కంటే తక్కువ",
			"price.500_1000": "₹500 - ₹1000",
			"price.1000_2000": "₹1000 - ₹2000",
			"price.above_2000": "₹2000 కంటే ఎక్కువ",
			"suitable.families": "కుటుంబాలకు",
			"suitable.couples": "జనులకు",
			"suitable.groups": "గుంపులకు",
			"suitable.kids": "కిడ్స్",
			"suitable.all_ages": "అన్ని వయస్సులకొరకు",
			"chemical_free": "రసాయన రాహిత్యం",
			// Cart
			"cart_empty_title": "మీ కార్ట్ ఖాళీగా ఉంది",
			"cart_empty_sub": "కొన్ని తాజా ఉత్పత్తులను జత చేయడం ప్రారంభించండి!",
			"browse_products": "ఉత్పత్తులను బ్రౌజ్ చేయండి",
			"shopping_cart": "షాపింగ్ కార్ట్",
			"order_summary": "ఆర్డర్ సంగ్రహం",
			"subtotal": "ఉప-మొత్తం",
			"delivery_fee": "డెలివరీ రుసుము",
			"free": "ఉచితం",
			"add_for_free_delivery": "ఉచిత డెలివరీ కోసం ఇంకా ₹{amount} జత చేయండి",
			"total": "మొత్తం",
			"promo_code": "ప్రోమో కోడ్",
			"apply": "ఆవేదించు",
			"proceed_to_checkout": "చెకౌట్‌కు వెళ్లండి",
			"continue_shopping": "షాపింగ్ కొనసాగించండి",
			// Discover / Filters / Sorts
			"filters": "ఫిల్టర్లు",
			"clear_filters": "ఫిల్టర్లను క్లియర్ చేయండి",
			"sort_distance": "దూరం వారీగా కొనసాగండి",
			"sort_rating": "రేటింగ్ వారీగా కొనసాగండి",
			"sort_price": "ధర వారీగా కొనసాగండి",
			"sort_newest": "తాజాగా మొదట",
			"found_farms": "{n} ఫారమ్‌లు కనుగొనబడ్డాయి",
			"found_experiences": "{n} అనుభవాలు కనుగొనబడ్డాయి",
			"showing_products": "{n} ఉత్పత్తులు చూపబడుతున్నాయి",
			"farm_experiences": "ఫార్మ్ అనుభవాలు",
			"available_products": "లభ్యమయ్యే ఉత్పత్తులు",
			"fresh_produce": "మా ఫార్మ్ నుండి తాజా ఉత్పత్తులు",
			"description": "వివరణ",
			"nutritional_benefits": "పోషక లాభాలు",
			"quantity_label": "పరిమాణం (kg)",
			"total_label": "మొత్తం",
			"delivery_options": "డెలివరీ ఎంపికలు",
			"home_delivery": "హోమ్ డెలివరీ అందుబాటులో ఉంది",
			"farm_pickup": "ఫార్మ్ పికప్ అందుబాటులో ఉంది",
			"subscription": "వారానికి డెలివరీకి సభ్యత్వం పొందండి",
			"add_to_cart": "కార్టులో జత చేయండి - ₹{price}",
			"similar_products": "సారూప్య ఉత్పత్తులు",
			"how_it_works": "ఇది ఎలా పనిచేస్తుంది",
			"how_steps_desc": "స్థానిక రైతులతో మూడు సాధారణ దశల్లో కలవండి",
			"step.discover": "కనుగొనండి",
			"step.order": "ఆర్డర్ లేదా బుక్ చేయండి",
			"step.enjoy": "ఆనందించండి",
			"featured_farms": "ఫీచర్డ్ ఫార్మ్‌లు",
			"discover_trusted": "నమ్మకమైన స్థానిక రైతులను కనుగొనండి",
			"seasonal_products": "సీజనల్ ఉత్పత్తులు",
			"trust_ready": "ఫార్మ్-తాజా జీవితం అనుభవించడానికి సిద్ధంగా ఉన్నారా?",
			"trust_sub": "హజార్ల కస్టమర్లలో చేరండి, తాజా ఉత్పత్తి మరియు అసలు ఫార్మ్ అనుభవాలను ఆస్వాదిస్తున్నారు",
			"order_fresh_produce": "తాజా ఉత్పత్తి ఆర్డర్ చేయండి",
			"book_farm_experience": "ఫార్మ్ అనుభవాన్ని బుక్ చేయండి",
			"footer_about": "సుస్థిర భవిష్యత్తుకు రైతులు మరియు వినియోగదారులను అనుసంధానం చేయడం.",
			"explore": "అన్వేషించండి",
			"support": "సహాయం",
			"newsletter": "న్యూస్‌లెటర్",
			"get_updates": "సీజనల్ ఉత్పత్తులపై అప్‌డేట్‌లు పొందండి",
			"subscribe": "సబ్‌స్క్రైబ్ చేయండి",
			"copyright": "© 2024 రూట్స్ & రౌట్స్. అన్ని హక్కులు పరిరక్షించబడ్డాయి.",
			"404_title": "404",
			"404_message": "అయ్యో! పేజీ కనుక లేదు",
			"return_home": "హోమ్‌కు తిరుగు",
			"orders": "ఆర్డర్లు",
			"bookings": "బుకింగ్‌లు",
			"saved": "సేవ్ చేయబడినవి",
			"settings": "సెట్టింగ్స్",
			"view_details_short": "వివరాలు చూడండి",
			"leave_review": "సమీక్ష ఇవ్వండి",
			"track_order": "ఆర్డర్ ట్రాక్ చేయండి",
			"contact_host": "హోస్టుతో సంప్రదించండి",
			"profile_information": "ప్రొఫైల్ సమాచారం",
			"delivery_addresses": "డెలివరీ చిరునామాలు",
			"payment_methods": "చెల్లింపు విధానాలు",
			"notifications": "నోటిఫికేషన్లు",
			"privacy_security": "గోప్యత & భద్రత",
			// categories & options
			"category.vegetables": "కూరగాయలు",
			"category.fruits": "ఫలాలు",
			"category.dairy": "డైరీ",
			"category.grains": "గింజలు",
			"category.honey": "తేనె",
			"category.spices": "మసాలా",
			"option.in_stock": "స్టాక్‌లో ఉంది",
			"option.seasonal": "సీజనల్",
			"option.preorder": "ప్రి-ఆర్డర్",
			"delivery.home": "హోమ్ డెలివరీ",
			"delivery.pickup": "ఫార్మ్ పికప్",
			"delivery.subscription": "సబ్‌స్క్రిప్షన్",
			"experience_type": "అనుభవం రకం",
			"duration": "కాలం",
			"price_range": "ధర పరిధి",
			"suitable_for": "అనుకూలంగా",
			"check_availability": "అందుబాటును తనిఖీ చేయండి",
			"search_dates": "తేదీలు శోధించు",
			"by_farmer": "{farmer} ద్వారా",
			"product.1.name": "ఆర్గానిక్ స్ట్రాబెరీస్",
			"product.2.name": "తాజా టొమాటోలు",
			"product.3.name": "మిక్స్డ్ గ్రీన్స్",
			"product.4.name": "ఆల్ఫాన్సో మామిడి",
			"product.5.name": "తాజా బండిల్ (భిండి)",
			"product.6.name": "ఆకుపచ్చ మిరప",
			"product.7.name": "తాజా కొత్తమంచి",
			"product.8.name": "ఆర్గానిక్ వంకాయ",
			"farm.1.name": "గ్రీన్ వ్యాలీ ఆర్గానిక్ ఫారం",
			"farm.2.name": "సన్‌రైజ్ వెజిటబుల్స్",
			"farm.3.name": "హ్యాపీ హార్వెస్ట్ ఫారం",
			"farm.4.name": "ఫ్రెష్ ఫీల్డ్స్ కోఆపరేటివ్",
			"farm.5.name": "నేచర్ బౌటీ ఫారం",
			"farm.6.name": "ఆర్గానిక్ ఓాసిస్",
			"experience.1.title": "ఆర్గానిక్ ఫారం ఉదయం పర్యటన",
			"experience.2.title": "ఫార్మ్ టు టేబుల్ వర్క్‌షాప్",
			"experience.3.title": "సాంప్రదాయ వ్యవసాయం అనుభవం",
			"experience.4.title": "ఆర్గానిక్ వంట శిక్షణ",
			"experience.5.title": "ఫార్మ్ స్టే వారాంతం",
			"experience.6.title": "డైరీ ఫారం సందర్శన",
			// New features in Telugu
			"farmer_dashboard": "రైతు డాష్‌బోర్డ్",
			"delivery_dashboard": "డెలివరీ డాష్‌బోర్డ్",
			"admin_dashboard": "అడ్మిన్ డాష్‌బోర్డ్",
			"customer_dashboard": "కస్టమర్ డాష్‌బోర్డ్",
			"manage_products": "ఉత్పత్తుల నిర్వహణ",
			"add_product": "ఉత్పత్తి జోడించండి",
			"inventory_management": "ఇన్వెంటరీ నిర్వహణ",
			"order_management": "ఆర్డర్ నిర్వహణ",
			"delivery_management": "డెలివరీ నిర్వహణ",
			"user_management": "వినియోగదారు నిర్వహణ",
			"analytics": "విశ్లేషణలు",
			"reports": "నివేదికలు",
			"system_notifications": "సిస్టమ్ నోటిఫికేషన్లు",
			"subscription_management": "సబ్‌స్క్రిప్షన్ నిర్వహణ",
			"payment_history": "చెల్లింపు చరిత్ర",
			"farmer_verification": "రైతు ధృవీకరణ",
			"quality_control": "నాణ్యత నియంత్రణ",
			"seasonal_planning": "కాలానుగుణ ప్రణాళిక",
			"weather_updates": "వాతావరణ అప్‌డేట్‌లు",
			"market_prices": "మార్కెట్ ధరలు",
			"farming_tips": "వ్యవసాయ చిట్కాలు",
			"community": "సంఘం",
			"help_support": "సహాయం & మద్దతు",
			"live_chat": "లైవ్ చాట్",
			"faq": "తరచుగా అడిగే ప్రశ్నలు",
			"contact_us": "మమ్మల్ని సంప్రదించండి",
			"about_us": "మా గురించి",
			"our_story": "మా కథ",
			"mission": "లక్ష్యం",
			"vision": "దృష్టి",
			"team": "బృందం",
			"careers": "కెరీర్లు",
			"press": "ప్రెస్",
			"blog": "బ్లాగ్",
			"sustainability": "స్థిరత్వం",
			"organic_certification": "సేంద్రీయ ధృవపత్రం",
			"environmental_impact": "పర్యావరణ ప్రభావం",
			"carbon_footprint": "కార్బన్ ఫుట్‌ప్రింట్",
			"waste_reduction": "వ్యర్థాలు తగ్గింపు",
			"water_conservation": "నీటి పరిరక్షణ",
			"soil_health": "మట్టి ఆరోగ్యం",
			"biodiversity": "జీవ వైవిధ్యం",
			"fair_trade": "న్యాయమైన వాణిజ్యం",
			"farmer_welfare": "రైతు సంక్షేమం",
			"community_development": "సంఘ అభివృద్ధి",
			"education_programs": "విద్యా కార్యక్రమాలు",
			"research_development": "పరిశోధన & అభివృద్ధి",
			"innovation": "ఆవిష్కరణ",
			"technology": "సాంకేతికత",
			"mobile_app": "మొబైల్ యాప్",
			"api_access": "API యాక్సెస్",
			"integration": "ఏకీకరణ",
			"partnerships": "భాగస్వామ్యాలు",
			"affiliate_program": "అనుబంధ కార్యక్రమం",
			"referral_program": "రెఫరల్ కార్యక్రమం",
			"loyalty_program": "లాయల్టీ కార్యక్రమం",
			"rewards": "రివార్డ్స్",
			"gift_cards": "గిఫ్ట్ కార్డ్స్",
			"corporate_sales": "కార్పొరేట్ సేల్స్",
			"bulk_orders": "బల్క్ ఆర్డర్లు",
			"wholesale": "హోల్‌సేల్",
			"restaurant_supply": "రెస్టారెంట్ సప్లై",
			"school_programs": "పాఠశాల కార్యక్రమాలు",
			"institutional_sales": "సంస్థాగత అమ్మకాలు",
			// Status and alerts in Telugu
			"status_active": "చురుకైన",
			"status_inactive": "నిష్క్రియ",
			"status_pending": "పెండింగ్",
			"status_completed": "పూర్తైన",
			"status_cancelled": "రద్దు",
			"status_in_progress": "పురోగతిలో",
			"status_delivered": "డెలివర్ అయ్యింది",
			"status_shipped": "పంపబడింది",
			"status_processing": "ప్రాసెసింగ్",
			"status_verified": "ధృవీకరించబడింది",
			"status_unverified": "ధృవీకరించబడలేదు",
			"low_stock_alert": "తక్కువ స్టాక్ అలర్ట్",
			"stock_out": "స్టాక్ లేదు",
			"stock_in": "స్టాక్ లో ఉంది",
			"restock_needed": "రీస్టాక్ అవసరం",
			"harvest_ready": "పంట సిద్ధం",
			"planting_season": "విత్తనాల కాలం",
			// Dashboard specific in Telugu
			"dashboard_overview": "సమీక్ష",
			"recent_activity": "ఇటీవలి కార్యకలాపాలు",
			"quick_stats": "త్వరిత గణాంకాలు",
			"top_products": "అగ్ర ఉత్పత్తులు",
			"revenue_summary": "ఆదాయ సారాంశం",
			"customer_feedback": "కస్టమర్ ఫీడ్‌బ్యాక్",
			"delivery_schedule": "డెలివరీ షెడ్యూల్",
			"route_optimization": "రూట్ ఆప్టిమైజేషన్",
			"earnings_tracker": "ఆర్జనలు ట్రాకర్",
			"performance_metrics": "పనితీరు మెట్రిక్స్",
			"inventory_alerts": "ఇన్వెంటరీ అలర్ట్స్",
			"sales_trends": "అమ్మకాల ట్రెండ్స్",
			"market_insights": "మార్కెట్ అంతర్దృష్టి",
			"crop_calendar": "పంట క్యాలెండర్",
			"farm_management": "ఫార్మ్ నిర్వహణ",
			"soil_testing": "మట్టి పరీక్ష",
			"pest_control": "పీడకాల నియంత్రణ",
			"irrigation_schedule": "నీటిపారుదల కార్యక్రమం",
			"harvest_planning": "పంట ప్రణాళిక",
			"storage_management": "నిల్వ నిర్వహణ",
			"transportation": "రవాణా",
			"packaging": "ప్యాకేజింగ్",
			"labeling": "లేబులింగ్",
			"traceability": "ట్రేసబిలిటీ",
			// FAQ page translations in Telugu
			"faq.title": "తరచుగా అడిగే ప్రశ్నలు",
			"faq.subtitle": "రూట్స్ & రౌట్స్ గురించి సాధారణ ప్రశ్నలకు సమాధానాలు కనుగొనండి",
			"faq.general.what_is": "రూట్స్ & రౌట్స్ అంటే ఏమిటి?",
			"faq.general.what_is_answer": "రూట్స్ & రౌట్స్ అనేది ఫార్మ్-టు-టేబుల్ మార్కెట్‌ప్లేస్, ఇది కస్టమర్లను తాజా సేంద్రీయ ఉత్పత్తులు మరియు అసలైన ఫార్మ్ అనుభవాల కోసం స్థానిక రైతులతో నేరుగా కనెక్ట్ చేస్తుంది.",
			"faq.general.how_order": "నేను ఆర్డర్ ఎలా చేయాలి?",
			"faq.general.how_order_answer": "మా ఉత్పత్తులను బ్రౌజ్ చేయండి, వస్తువులను మీ కార్ట్‌లో జోడించండి, మరియు చెకౌట్‌కు వెళ్లండి. మీరు హోమ్ డెలివరీ లేదా ఫార్మ్ పికప్ ఎంపికలను ఎంచుకోవచ్చు.",
			"faq.general.payment_methods": "మీరు ఏ చెల్లింపు పద్ధతులను అంగీకరిస్తారు?",
			"faq.general.payment_methods_answer": "మేము అన్ని ప్రధాన క్రెడిట్ కార్డ్‌లు, డెబిట్ కార్డ్‌లు, UPI చెల్లింపులు, మరియు ఎంపిక చేసిన ప్రాంతాలకు క్యాష్ ఆన్ డెలివరీని అంగీకరిస్తాము.",
			"faq.farmer.become": "నేను మీ ప్లాట్‌ఫారమ్‌లో రైతుగా ఎలా మారగలను?",
			"faq.farmer.become_answer": "రైతుగా సైన్ అప్ చేయండి, ఫార్మ్ డాక్యుమెంటేషన్ మరియు నాణ్యత ధృవీకరణతో సహా వెరిఫికేషన్ ప్రక్రియను పూర్తి చేయండి. మా బృందం 5-7 వ్యాపార దినాలలో మీ అప్లికేషన్‌ను సమీక్షించి ఆమోదిస్తుంది.",
			"faq.farmer.commission": "రైతులకు కమీషన్ రేట్లు ఎంత?",
			"faq.farmer.commission_answer": "మేము ఉత్పత్తి వర్గం మరియు వాల్యూమ్ ఆధారంగా 15-20% పోటీ కమీషన్ వసూలు చేస్తాము. ఇందులో మార్కెటింగ్, చెల్లింపు ప్రాసెసింగ్, మరియు కస్టమర్ సపోర్ట్ ఉంటుంది.",
			"faq.delivery.become": "నేను డెలివరీ పార్టనర్ ఎలా అవ్వగలను?",
			"faq.delivery.become_answer": "డెలివరీ పార్టనర్‌గా రిజిస్టర్ చేయండి, వాహన డాక్యుమెంటేషన్ అందించండి మరియు మా ట్రైనింగ్ ప్రోగ్రామ్ పూర్తి చేయండి. ఆమోదం తర్వాత మీరు వెంటనే సంపాదన ప్రారంభించవచ్చు.",
			"faq.delivery.earnings": "డెలివరీ పార్టనర్ సంపాదనలు ఎంత?",
			"faq.delivery.earnings_answer": "డెలివరీ పార్టనర్లు కస్టమర్ రేటింగ్‌లు మరియు డెలివరీ సామర్థ్యం ఆధారంగా ₹15-25 పర్ కిమీ ప్లస్ ఇన్సెంటివ్‌లు సంపాదిస్తారు. వారపు చెల్లింపులు అందుబాటులో ఉన్నాయి.",
			"faq.customer.freshness": "ఉత్పత్తులు ఎంత తాజాగా ఉంటాయి?",
			"faq.customer.freshness_answer": "అన్ని ఉత్పత్తులు డెలివరీకి 24-48 గంటల లోపు పండించబడతాయి. గరిష్ట తాజాతనం కోసం మేము కోల్డ్ చైన్ లాజిస్టిక్స్ నిర్వహిస్తాము.",
			"faq.customer.satisfaction": "నా ఆర్డర్‌తో నేను సంతృప్తి చెందకపోతే ఏమి చేయాలి?",
			"faq.customer.satisfaction_answer": "మేము 100% సంతృప్తి హామీ ఇస్తాము. రీఫండ్ లేదా రీప్లేస్‌మెంట్ కోసం డెలివరీ తర్వాత 24 గంటలలో మాతో సంప్రదించండి.",
			"faq.need_help": "ఇంకా సహాయం కావాలా?",
			"faq.contact_support": "మా సపోర్ట్ బృందాన్ని సంప్రదించండి",
			// Sustainability page translations in Telugu
			"sustainability.title": "స్థిరత్వానికి మా నిబద్ధత",
			"sustainability.subtitle": "స్థిరమైన వ్యవసాయం మరియు బాధ్యతాయుత వ్యాపార పద్ధతుల ద్వారా హరిత భవిష్యత్తు నిర్మాణం",
			"sustainability.carbon_neutral": "కార్బన్ న్యూట్రల్ డెలివరీలు",
			"sustainability.carbon_neutral_desc": "మా డెలివరీలు ఎలక్ట్రిక్ లేదా పర్యావరణ-అనుకూల వాహనాలను ఉపయోగిస్తాయి",
			"sustainability.water_conservation": "నీటి పరిరక్షణ",
			"sustainability.water_conservation_desc": "సమర్థవంతమైన వ్యవసాయం ద్వారా నీటి వినియోగంలో తగ్గింపు",
			"sustainability.waste_reduction": "వ్యర్థాలు తగ్గింపు",
			"sustainability.waste_reduction_desc": "పునర్వినియోగ కంటైనర్లతో తక్కువ ప్యాకేజింగ్ వ్యర్థాలు",
			"sustainability.farmer_welfare": "రైతు సంక్షేమం",
			"sustainability.farmer_welfare_desc": "న్యాయమైన వాణిజ్య పద్ధతులతో మద్దతు పొందిన రైతులు",
			"sustainability.certifications": "మా ధృవపత్రాలు",
			"sustainability.initiatives": "స్థిరత్వ చొరవలు",
			"sustainability.regenerative_farming": "పునరుత్పాదక వ్యవసాయం",
			"sustainability.regenerative_farming_desc": "మట్టి ఆరోగ్యం మరియు జీవ వైవిధ్యాన్ని పునరుద్ధరించే పునరుత్పాదక వ్యవసాయ పద్ధతులను అవలంబించడంలో రైతులకు మద్దతు.",
			"sustainability.zero_waste": "జీరో వేస్ట్ ప్యాకేజింగ్",
			"sustainability.zero_waste_desc": "పర్యావరణ ప్రభావాన్ని తగ్గించడానికి తిరిగి ఇవ్వదగిన మరియు బయోడిగ్రేడబుల్ ప్యాకేజింగ్ పరిష్కారాలను అమలు చేయడం.",
			"sustainability.solar_powered": "సౌర శక్తితో నడిచే సౌకర్యాలు",
			"sustainability.solar_powered_desc": "మా వేర్‌హౌస్‌లు మరియు ప్రాసెసింగ్ సౌకర్యాలు పునరుత్పాదక సౌర శక్తితో నడుస్తాయి.",
			"sustainability.education": "రైతు విద్య",
			"sustainability.education_desc": "స్థిరమైన వ్యవసాయం, సేంద్రీయ పద్ధతులు, మరియు ఆధునిక సాంకేతికతపై శిక్షణా కార్యక్రమాలు.",
			"sustainability.community_dev": "సంఘ అభివృద్ధి",
			"sustainability.community_dev_desc": "వ్యవసాయ సంఘాలలో పాఠశాలలు, ఆరోగ్య సౌకర్యాలు, మరియు మౌలిక సదుపాయాలను నిర్మించడం.",
			// Blog page translations in Telugu
			"blog.title": "ఫార్మ్ కథలు & అప్‌డేట్‌లు",
			"blog.subtitle": "తాజా వ్యవసాయ ట్రెండ్‌లు, కాలానుగుణ చిట్కాలు, మరియు సంఘ కథలతో అప్‌డేట్‌గా ఉండండి",
			"blog.featured": "ఫీచర్డ్ కథలు",
			"blog.latest": "తాజా పోస్ట్‌లు",
			"blog.categories": "వర్గాలు",
			"blog.read_more": "మరింత చదవండి",
			"blog.share": "భాగస్వామ్యం",
			"blog.related": "సంబంధిత పోస్ట్‌లు",
			"blog.author": "రచయిత",
			"blog.published": "ప్రచురించబడింది",
			"blog.tags": "ట్యాగ్‌లు",
			// Contact page translations in Telugu
			"contact.title": "సంప్రదించండి",
			"contact.subtitle": "మేము మీ నుండి వినాలని అనుకుంటున్నాము. మాకు సందేశం పంపండి మరియు మేము వీలైనంత త్వరగా స్పందిస్తాము.",
			"contact.name": "మీ పేరు",
			"contact.email": "ఇమెయిల్ చిరునామా",
			"contact.phone": "ఫోన్ నంబర్",
			"contact.subject": "విషయం",
			"contact.message": "సందేశం",
			"contact.send": "సందేశం పంపండి",
			"contact.office_hours": "ఆఫీస్ గంటలు",
			"contact.address": "చిరునామా",
			"contact.emergency": "అత్యవసర మద్దతు",
			"contact.follow_us": "మమ్మల్ని అనుసరించండి",
			// Navigation and menu items in Telugu
			"nav.home": "హోమ్",
			"nav.about": "గురించి",
			"nav.farmers": "రైతుల కోసం",
			"nav.delivery": "డెలివరీ పార్టనర్‌ల కోసం",
			"nav.customers": "కస్టమర్‌ల కోసం",
			"nav.how_it_works": "ఇది ఎలా పనిచేస్తుంది",
			"nav.pricing": "ధర నిర్ధారణ",
			"nav.support": "మద్దతు",
			"nav.blog": "బ్లాగ్",
			"nav.careers": "కెరీర్‌లు",
			"nav.press": "ప్రెస్",
			"nav.partnerships": "భాగస్వామ్యాలు",
			"nav.affiliate": "అనుబంధ కార్యక్రమం",
			"nav.terms": "సేవా నిబంధనలు",
			"nav.privacy": "గోప్యతా విధానం",
			"nav.legal": "చట్టపరమైన",
			"nav.feedback": "ఫీడ్‌బ్యాక్",
			"nav.sitemap": "సైట్‌మ్యాప్",
		},
	};

	// helper t(key) returns translation or the key if missing
	const t = (key: string) => {
		return translations[lang]?.[key] ?? key;
	};

	// initialize language from localStorage and expose a small global i18n helper
	useEffect(() => {
		const saved = typeof window !== "undefined" ? localStorage.getItem("site_lang") ?? "en" : "en";
		setLang(saved);
		try {
			(window as Window).__i18n = {
				lang: saved,
				translations,
				t: (k: string) => translations[saved]?.[k] ?? k,
			};
		} catch {
			/* ignore */
		}
		// run once on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// change language handler used by the <select>
	const changeLang = (value: string) => {
		setLang(value);
		try {
			localStorage.setItem("site_lang", value);
		} catch {
			/* ignore */
		}
		try {
			(window as Window).__i18n = {
				lang: value,
				translations,
				t: (k: string) => translations[value]?.[k] ?? k,
			};
			window.dispatchEvent(new CustomEvent("langchange", { detail: value }));
		} catch {
			/* ignore */
		}
	};
	// --- end replaced ---

	// Navigate handler with router fallback
	const handleNav = (path: string) => (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			navigate(path);
		} catch {
			// fallback for environments without router context
			window.location.href = path;
		}
	};
	// end added

	return (
		<>
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<a
						href="/"
						onClick={handleNav("/")}
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
							<Sprout className="h-6 w-6 text-white" />
						</div>
						<div className="hidden sm:block">
							<h1 className="font-display text-xl font-bold text-foreground leading-none">
								{t("title")}
							</h1>
							<p className="text-xs text-muted-foreground">{t("tagline")}</p>
						</div>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6">
						<a
							href="/discover"
							onClick={handleNav("/discover")}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/discover") ? "text-primary" : "text-foreground"
							)}
						>
							{t("discover")}
						</a>
						<a
							href="/products"
							onClick={handleNav("/products")}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/products") ? "text-primary" : "text-foreground"
							)}
						>
							{t("products")}
						</a>
						<a
							href="/experiences"
							onClick={handleNav("/experiences")}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary",
								isActive("/experiences") ? "text-primary" : "text-foreground"
							)}
						>
							{t("experiences")}
						</a>
						
						{/* Community Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="text-sm font-medium">
									{t("community")}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => navigate('/blog')}>
									{t("blog")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate('/sustainability')}>
									{t("sustainability")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate('/farming-tips')}>
									{t("farming_tips")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate('/market-prices')}>
									{t("market_prices")}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Support Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="text-sm font-medium">
									{t("help_support")}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => navigate('/faq')}>
									{t("faq")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate('/contact')}>
									{t("contact_us")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate('/live-chat')}>
									{t("live_chat")}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => navigate('/about')}>
									{t("about_us")}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</nav>

					{/* Actions */}
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="hidden sm:flex">
							<Search className="h-5 w-5" />
						</Button>

						{/* --- Updated: language selector --- */}
						<div className="flex items-center">
							<label htmlFor="site-lang" className="sr-only">
								{t("languageLabel")}
							</label>
							<select
								id="site-lang"
								value={lang}
								onChange={(e) => changeLang(e.target.value)}
								className="rounded-md border bg-transparent px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								aria-label={t("languageLabel")}
							>
								<option value="en">English</option>
								<option value="hi">हिन्दी</option>
								<option value="te">తెలుగు</option>
							</select>
						</div>
						{/* --- end updated --- */}

						<a href="/cart" onClick={handleNav("/cart")}>
							<Button variant="ghost" size="icon" className="relative">
								<ShoppingCart className="h-5 w-5" />
								{getTotalItems() > 0 && (
									<Badge
										variant="accent"
										className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
									>
										{getTotalItems()}
									</Badge>
								)}
							</Button>
						</a>

						{user ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="flex items-center gap-2">
										<Avatar className="h-8 w-8">
											<AvatarImage src={user.avatar} />
											<AvatarFallback>
												{user.name?.charAt(0).toUpperCase() || 'U'}
											</AvatarFallback>
										</Avatar>
										<span className="hidden sm:inline font-medium">{user.name}</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">{user.name}</p>
											<p className="text-xs leading-none text-muted-foreground">
												{user.email}
											</p>
											<p className="text-xs leading-none text-muted-foreground capitalize">
												{user.role}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{/* Show dashboard link for non-customer roles */}
									{user.role !== 'customer' && (
										<DropdownMenuItem onClick={() => navigate(getDashboardPath(user.role))}>
											<LayoutDashboard className="mr-2 h-4 w-4" />
											<span>{t(`${user.role}_dashboard`)}</span>
										</DropdownMenuItem>
									)}
									
									{/* Role-specific menu items */}
									{user.role === 'farmer' && (
										<>
											<DropdownMenuItem onClick={() => navigate('/farmer/products')}>
												<Package className="mr-2 h-4 w-4" />
												<span>{t("manage_products")}</span>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => navigate('/farmer/analytics')}>
												<Settings className="mr-2 h-4 w-4" />
												<span>{t("analytics")}</span>
											</DropdownMenuItem>
										</>
									)}
									
									{user.role === 'delivery' && (
										<>
											<DropdownMenuItem onClick={() => navigate('/delivery/routes')}>
												<Package className="mr-2 h-4 w-4" />
												<span>{t("delivery_schedule")}</span>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => navigate('/delivery/earnings')}>
												<Settings className="mr-2 h-4 w-4" />
												<span>{t("earnings_tracker")}</span>
											</DropdownMenuItem>
										</>
									)}
									
									{user.role === 'admin' && (
										<>
											<DropdownMenuItem onClick={() => navigate('/admin/users')}>
												<User className="mr-2 h-4 w-4" />
												<span>{t("user_management")}</span>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => navigate('/admin/reports')}>
												<Settings className="mr-2 h-4 w-4" />
												<span>{t("reports")}</span>
											</DropdownMenuItem>
										</>
									)}
									
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => navigate('/account')}>
										<User className="mr-2 h-4 w-4" />
										<span>{t("profile")}</span>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => navigate('/account')}>
										<Package className="mr-2 h-4 w-4" />
										<span>{t("my_orders")}</span>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => navigate('/account')}>
										<Calendar className="mr-2 h-4 w-4" />
										<span>{t("my_bookings")}</span>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => navigate('/account')}>
										<Settings className="mr-2 h-4 w-4" />
										<span>{t("account_settings")}</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={logout}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>{t("logout")}</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button onClick={() => setShowAuthModal(true)} size="sm">
								{t("login")}
							</Button>
						)}

						<Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
			
			{/* Mobile Menu */}
			{showMobileMenu && (
				<div className="md:hidden border-t bg-background">
					<div className="container mx-auto px-4 py-4 space-y-4">
						<nav className="space-y-2">
							<a
								href="/discover"
								onClick={(e) => { handleNav("/discover")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("discover")}
							</a>
							<a
								href="/products"
								onClick={(e) => { handleNav("/products")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("products")}
							</a>
							<a
								href="/experiences"
								onClick={(e) => { handleNav("/experiences")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("experiences")}
							</a>
							<a
								href="/blog"
								onClick={(e) => { handleNav("/blog")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("blog")}
							</a>
							<a
								href="/sustainability"
								onClick={(e) => { handleNav("/sustainability")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("sustainability")}
							</a>
							<a
								href="/faq"
								onClick={(e) => { handleNav("/faq")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("faq")}
							</a>
							<a
								href="/contact"
								onClick={(e) => { handleNav("/contact")(e); setShowMobileMenu(false); }}
								className="block text-sm font-medium py-2 px-4 rounded hover:bg-muted"
							>
								{t("contact_us")}
							</a>
						</nav>
						
						{user && user.role !== 'customer' && (
							<div className="pt-4 border-t">
								<a
									href={getDashboardPath(user.role)}
									onClick={(e) => { handleNav(getDashboardPath(user.role))(e); setShowMobileMenu(false); }}
									className="block text-sm font-medium py-2 px-4 rounded bg-primary text-primary-foreground"
								>
									{t(`${user.role}_dashboard`)}
								</a>
							</div>
						)}
					</div>
				</div>
			)}
		</header>

		<AuthModal 
			isOpen={showAuthModal} 
			onClose={() => setShowAuthModal(false)} 
		/>
		</>
	);
}
