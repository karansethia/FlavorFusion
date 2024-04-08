import OrderStatusHeader from "@/components/OrderStatusHeader";
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
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
