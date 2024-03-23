export type UserDataType = {
  email: string;
  name: string;
  addressLine: string;
  city: string;
  postalCode: number;
  country: string;
};

type MenuItemType = {
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
