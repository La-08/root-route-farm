import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${name} added to cart!`);
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
            {seasonal && <Badge variant="seasonal">Seasonal</Badge>}
            {organic && <Badge variant="organic">Organic</Badge>}
            {!inStock && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{farmName}</p>
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
                Add
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
