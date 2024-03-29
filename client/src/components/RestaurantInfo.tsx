import {RestaurantDataType} from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Dot} from "lucide-react";

type RestaurantInfoProps = {
  restaurant: RestaurantDataType;
};

const RestaurantInfo = ({restaurant}: RestaurantInfoProps) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="font-3sx tracking-tight font-semibold">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {restaurant.cuisines.map((cuisine, index) => (
          <span className="flex items-center">
            <span>{cuisine}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
