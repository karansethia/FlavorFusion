import {Order} from "@/lib/types";

type OrderStatusDetailProps = {
  order: Order;
};

const OrderStatusDetail = ({order}: OrderStatusDetailProps) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering To:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine},{order.deliveryDetails.city}{" "}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.menuItemId}>
              {item.name} X {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span className="">{order.totalAmount}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
