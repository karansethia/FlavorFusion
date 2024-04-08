import {OrderStatus} from "@/lib/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progress: number;
}[];

export const ORDER_STATUS: OrderStatusInfo = [
  {
    label: "Placed",
    value: "placed",
    progress: 0,
  },
  {
    label: "Awaiting Restaurant Conformation",
    value: "paid",
    progress: 25,
  },
  {
    label: "In Progress",
    value: "inProgress",
    progress: 50,
  },
  {
    label: "Out For Delivery",
    value: "outForDelivery",
    progress: 75,
  },
  {
    label: "Delivered",
    value: "delivered",
    progress: 100,
  },
];
