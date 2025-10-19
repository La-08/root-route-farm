import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  farmName: string;
  image: string;
  price: number;
  unit: string;
  inStock: boolean;
  seasonal?: boolean;
  organic?: boolean;
}

export function ProductCard({
  id,
  name,
  farmName,
  image,
  price,
  unit,
  inStock,
  seasonal,
  organic,
}: ProductCardProps) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const h = () => setTick((s) => s + 1);
    window.addEventListener("langchange", h);
    return () => window.removeEventListener("langchange", h);
  }, []);
  type I18n = { t: (key: string) => string };
  const t = (k: string) =>
    (window as unknown as Window & { __i18n?: I18n }).__i18n?.t(k) ?? k;

  const { addToCart } = useCart();
  const displayName = t(name);
  const displayFarm = t(farmName);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      farmName,
      image,
      price,
      unit
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden hover-lift transition-smooth cursor-pointer group">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {seasonal && <Badge variant="seasonal">{t("seasonal")}</Badge>}
            {organic && <Badge variant="organic">{t("organic")}</Badge>}
            {!inStock && <Badge variant="destructive">{t("out_of_stock")}</Badge>}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{displayFarm}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">₹{price}</span>
              <span className="text-sm text-muted-foreground ml-1">/{unit}</span>
            </div>
            {inStock && (
              <Button
                size="sm"
                variant="accent"
                onClick={handleAddToCart}
                className="gap-1"
              >
                <ShoppingCart className="h-4 w-4" />
                {t("add")}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
