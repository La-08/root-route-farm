import { Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ExperienceCardProps {
  id: number;
  title: string;
  farmName: string;
  image: string;
  duration: string;
  price: number;
  capacity: number;
  distance: number;
}

export function ExperienceCard({
  id,
  title,
  farmName,
  image,
  duration,
  price,
  capacity,
  distance,
}: ExperienceCardProps) {
  return (
    <Link to={`/experience/${id}`}>
      <Card className="overflow-hidden hover-lift transition-smooth cursor-pointer group">
        <div className="relative h-56 overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              {title}
            </h3>
            <p className="text-sm text-white/90">{farmName}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Up to {capacity}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{distance}km</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">From</span>
              <div>
                <span className="text-2xl font-bold text-primary">₹{price}</span>
                <span className="text-sm text-muted-foreground ml-1">/person</span>
              </div>
            </div>
            <Button variant="outline">View Details</Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
