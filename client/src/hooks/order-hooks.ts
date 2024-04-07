import {axiosReq} from "@/lib/http";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "@tanstack/react-query";
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
