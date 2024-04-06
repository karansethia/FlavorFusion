import RestaurantInfo from "@/components/RestaurantInfo";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import MenuItem from "@/components/MenuItem";

import {useGetRestaurantDetails} from "@/hooks/user-operation-hooks";
import {useParams} from "react-router-dom";
import {CartItemType, MenuItemType} from "@/lib/types";
import {useState} from "react";
import {Card, CardFooter} from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import CheckoutButton from "@/components/CheckoutButton";
import {UserFormData} from "@/forms/user-profile-form/UserProfileForm";
import {useCreateCheckoutSession} from "@/hooks/order-hooks";

const DetailPage = () => {
  const {restaurantId} = useParams();
  const {restaurantDetails, isLoading} = useGetRestaurantDetails(restaurantId);
  const {createCheckooutSession, isPending} = useCreateCheckoutSession();
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCartHandler = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };
  const removeFromCartHandler = (cartItem: CartItemType) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };
  const checkoutHandler = async (userFormData: UserFormData) => {
    if (!restaurantDetails) {
      return;
    }
    console.log("user form data", userFormData);
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),
      restaurantId: restaurantDetails._id,
      deliveryDetails: {
        name: userFormData.name,
        email: userFormData.email as string,
        addressLine: userFormData.addressLine,
        city: userFormData.city,
        country: userFormData.country,
        postalCode: userFormData.postalCode,
      },
    };

    const data = await createCheckooutSession(checkoutData);
    window.location.href = data.url;
  };
  if (isLoading || !restaurantDetails) {
    return <p>Loading</p>;
  }
  return (
    <div className="flex flex-col gap-10 mx-12">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantDetails?.imageUrl}
          alt=""
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 lg:px-16">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantDetails} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurantDetails.menuItems.map((item, index) => (
            <MenuItem
              key={index}
              menuItem={item}
              onAddToCart={() => addToCartHandler(item)}
            />
          ))}
        </div>
        <div className="">
          <Card>
            <OrderSummary
              restaurant={restaurantDetails}
              cartItems={cartItems}
              onRemoveFromCart={removeFromCartHandler}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={checkoutHandler}
                isLoading={isPending}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
