import { Link, useLocation } from "react-router-dom";
import { Sprout, ShoppingCart, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = useLocation();
  const cartItemCount = 2; // Mock data

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-bold text-foreground leading-none">
                Roots & Routes
              </h1>
              <p className="text-xs text-muted-foreground">Farm to Table</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/discover"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/discover") ? "text-primary" : "text-foreground"
              )}
            >
              Discover Farms
            </Link>
            <Link
              to="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/products") ? "text-primary" : "text-foreground"
              )}
            >
              Products
            </Link>
            <Link
              to="/experiences"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/experiences") ? "text-primary" : "text-foreground"
              )}
            >
              Experiences
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
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
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
