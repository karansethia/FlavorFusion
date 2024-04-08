import {axiosReq} from "@/lib/http";
import {Order} from "@/lib/types";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

type CheckoutSessionRequestType = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine: string;
    city: string;
    postalCode: number;
    country: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const {getAccessTokenSilently} = useAuth0();
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequestType
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.post(
      "/order/checkout/create-checkout-session",
      {checkoutSessionRequest},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };
  const {
    mutateAsync: createCheckooutSession,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: createCheckoutSessionRequest,
  });
  if (error) {
    console.log(error);

    toast.error("Something went wrong");
    reset();
  }
  return {createCheckooutSession, isPending};
};

export const useGetOrder = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.get("/order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrderRequest,
  });
  if (isError) {
    console.log(error);
    toast.error("Something went wrong");
  }
  return {orders, isLoading};
};
