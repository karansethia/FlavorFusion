import {type MenuItemType} from "@/lib/types";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Button} from "./ui/button";

type MenuItemProps = {
  menuItem: MenuItemType;
  onAddToCart: () => void;
};

const MenuItem = ({menuItem, onAddToCart}: MenuItemProps) => {
  return (
    <div>
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-semibold flex flex-row items-center justify-between">
          <span>&#8377; {menuItem.price}</span>
          <Button
            variant="default"
            className="bg-orange-500"
            onClick={onAddToCart}
          >
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuItem;
