import {Order, OrderStatus} from "@/lib/types";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Separator} from "./ui/separator";
import {Badge} from "./ui/badge";
import {Label} from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {ORDER_STATUS} from "@/config/order-status-config";
import {useUpdateRestaurantOrders} from "@/hooks/vendor-hooks";
import {useEffect, useState} from "react";

type OrderItemCardProps = {
  order: Order;
};

const OrderItemCard = ({order}: OrderItemCardProps) => {
  const {updateOrderStatus, isPending} = useUpdateRestaurantOrders();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    console.log(hours, minutes);

    return `${hours}:${minutes <= 0 ? `0${minutes}` : `${minutes}`}`;
  };
  const statusChangeHandler = async (newStatus: OrderStatus) => {
    await updateOrderStatus({orderId: order._id as string, status: newStatus});
    setStatus(newStatus);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
            <div className="font-semibold text-base">
              Customer Name:
              <span className="ml-2 font-normal">
                {order.deliveryDetails.name}
              </span>
            </div>
            <div className="font-semibold text-base">
              Delivery Address:
              <span className="ml-2 font-normal">
                {order.deliveryDetails.addressLine},{" "}
                {order.deliveryDetails.city}
              </span>
            </div>
            <div className="font-semibold text-base">
              Time:
              <span className="ml-2 font-normal">{getTime()}</span>
            </div>
            <div className="font-semibold text-base">
              Total Cost:
              <span className="ml-2 font-normal">{order.totalAmount}</span>
            </div>
          </CardTitle>
          <Separator />
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {order.cartItems.map((item) => (
                <span>
                  <Badge variant="outline" className="mr-2">
                    {item.quantity}
                  </Badge>
                  {item.name}
                </span>
              ))}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">What is the status of this order?</Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  statusChangeHandler(value as OrderStatus)
                }
                disabled={isPending}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {ORDER_STATUS.map((currStatus) => (
                    <SelectItem value={currStatus.value} key={currStatus.value}>
                      {currStatus.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default OrderItemCard;
