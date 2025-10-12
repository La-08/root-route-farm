import { MapPin, Star, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    __i18n?: {
      lang: string;
      translations: Record<string, Record<string, string>>;
      t: (k: string) => string;
    };
  }
}

interface FarmCardProps {
  id: number;
  name: string;
  farmer: string;
  image: string;
  distance: number;
  rating: number;
  reviewCount: number;
  verified?: boolean;
  organic?: boolean;
}

export function FarmCard({
  id,
  name,
  farmer,
  image,
  distance,
  rating,
  reviewCount,
  verified,
  organic,
}: FarmCardProps) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const h = () => setTick((s) => s + 1);
    window.addEventListener("langchange", h);
    return () => window.removeEventListener("langchange", h);
  }, []);
  const t = (k: string) => window.__i18n?.t(k) ?? k;

  return (
    <Link to={`/farm/${id}`}>
      <Card className="overflow-hidden hover-lift transition-smooth cursor-pointer group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {verified && (
              <Badge variant="verified" className="shadow-soft">
                <BadgeCheck className="h-3 w-3 mr-1" />
                {t("verified")}
              </Badge>
            )}
            {organic && (
              <Badge variant="organic" className="shadow-soft">
                {t("organic")}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
            {t(name)}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {t("by_farmer")?.replace("{farmer}", farmer) ?? `by ${farmer}`}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {t("distance_away").replace("{distance}", String(distance))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
