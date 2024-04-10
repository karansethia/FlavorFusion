import {Order} from "@/lib/types";
import {Card, CardHeader, CardTitle} from "./ui/card";

type OrderItemCardProps = {
  order: Order;
};

const OrderItemCard = ({order}: OrderItemCardProps) => {
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    console.log(hours, minutes);

    return `${hours}:${minutes <= 0 ? `0${minutes}` : `${minutes}`}`;
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
        </CardHeader>
      </Card>
    </div>
  );
};

export default OrderItemCard;
