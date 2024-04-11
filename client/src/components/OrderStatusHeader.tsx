import {Order} from "@/lib/types";
import {Progress} from "./ui/progress";
import {ORDER_STATUS} from "@/config/order-status-config";

type OrderStatusHeaderProps = {
  order: Order;
};

const OrderStatusHeader = ({order}: OrderStatusHeaderProps) => {
  const estimatedTime = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };
  const getOrderStatus = () => {
    console.log(order);

    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };
  return (
    <>
      <h1 className="text-4xl font-bold flex flex-col tracking-tighter gap-5 md:flex-row md:justify-between">
        <span> Order Status : {getOrderStatus().value}</span>
        <span> Expected by : {estimatedTime()}</span>
      </h1>
      <Progress className="animate-pulse" value={getOrderStatus().progress} />
    </>
  );
};

export default OrderStatusHeader;
