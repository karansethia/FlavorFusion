import {Order} from "@/lib/types";
import {Progress} from "./ui/progress";

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
  return (
    <>
      <h1 className="text-4xl font-bold flex flex-col tracking-tighter gap-5 md:flex-row md:justify-between">
        <span> Order Status : {order.status}</span>
        <span> Expected by : {estimatedTime()}</span>
      </h1>
      <Progress className="animate-pulse" value={50} />
    </>
  );
};

export default OrderStatusHeader;
