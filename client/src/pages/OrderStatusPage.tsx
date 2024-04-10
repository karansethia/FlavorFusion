import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useGetOrder} from "@/hooks/order-hooks";

const OrderStatusPage = () => {
  console.log("insode orders");

  const {orders, isLoading} = useGetOrder();
  console.log(orders);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (!orders || orders.length === 0) {
    return <p>No orders found</p>;
  }
  return (
    <div className="space-y-10 m-6">
      {orders.map((order) => (
        <div className="space-y-10 bg-slate-100 shadow-md rounded-lg p-10">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
