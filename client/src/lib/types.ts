export type UserDataType = {
  email: string;
  name: string;
  addressLine: string;
  city: string;
  postalCode: number;
  country: string;
};

export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
};
export type RestaurantDataType = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  lastUpdated: string;
  imageUrl: string;
};

export type RestaurantSearchResponse = {
  results: RestaurantDataType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CartItemType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: RestaurantDataType;
  user: UserDataType;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};
