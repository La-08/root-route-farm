import { useLocation, useNavigate } from "react-router-dom";
import { Sprout, ShoppingCart, User, Menu, Search, LogOut, Settings, Package, Calendar, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
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
	const [showAuthModal, setShowAuthModal] = useState(false);

	const isActive = (path: string) => location.pathname === path;

	// --- Added: mock cart item count to fix ReferenceError ---
	const cartItemCount = 2;
	// --- end added ---

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
								{cartItemCount > 0 && (
									<Badge
										variant="accent"
										className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
									>
										{cartItemCount}
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
											<span>Dashboard</span>
										</DropdownMenuItem>
									)}
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

						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</header>

		<AuthModal 
			isOpen={showAuthModal} 
			onClose={() => setShowAuthModal(false)} 
		/>
		</>
	);
}
