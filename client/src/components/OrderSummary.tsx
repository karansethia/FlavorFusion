import {CartItemType, RestaurantDataType} from "@/lib/types";
import {CardContent, CardHeader, CardTitle} from "./ui/card";
import {Badge} from "./ui/badge";
import {Separator} from "./ui/separator";
import {Trash} from "lucide-react";

type OrderSummaryProps = {
  restaurant: RestaurantDataType;
  cartItems: CartItemType[];
  onRemoveFromCart: (cartItem: CartItemType) => void;
};

const OrderSummary = ({
  cartItems,
  restaurant,
  onRemoveFromCart,
}: OrderSummaryProps) => {
  const getTotalCost = () => {
    const itemsPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const total = itemsPrice + restaurant.deliveryPrice;
    return total;
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span> &#8377; {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between text-sm">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="items-center gap-2">
              {" "}
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => onRemoveFromCart(item)}
              />
              &#8377; {item.price}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs {restaurant.deliveryPrice}</span>
        </div>
      </CardContent>
    </>
  );
};

export default OrderSummary;
