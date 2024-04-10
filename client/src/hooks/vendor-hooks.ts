import {axiosReq} from "@/lib/http";
import {Order, RestaurantDataType} from "@/lib/types";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

export const useRegisterVendor = () => {
  const {getAccessTokenSilently} = useAuth0();

  const registerVendorRequest = async (
    restaurantFormData: FormData
  ): Promise<RestaurantDataType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await axiosReq.post("/restaurant", restaurantFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status !== 201) {
      console.log(error?.message);
      throw new Error("Something went wrong");
    }

    return response.data;
  };
  const {
    mutate: registerVendor,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: registerVendorRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant created");
  }
  if (isError && error) {
    console.log(error.message);

    toast.error("Couldnt register your restaurant");
  }
  return {registerVendor, isPending};
};

export const useUpdateVendor = () => {
  const {getAccessTokenSilently} = useAuth0();

  const updateVendorRequest = async (
    restaurantFormData: FormData
  ): Promise<RestaurantDataType> => {
    const accessToken = await getAccessTokenSilently();
    for (const value of restaurantFormData.values()) {
      console.log(value);
    }
    const response = await axiosReq.put("/restaurant", restaurantFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  };
  const {
    mutate: updateVendor,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateVendorRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (isError && error) {
    console.log(error.message);

    toast.error("Couldnt update your restaurant");
  }
  return {updateVendor, isPending};
};

export const useGetRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();

  const getVendorRequest = async (): Promise<RestaurantDataType> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.get("/restaurant", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 401) {
      throw new Error("Error fetching");
    }
    return response.data;
  };
  const {data: restaurantDetails, isLoading} = useQuery({
    queryKey: ["restaurant"],
    queryFn: getVendorRequest,
    retry: 1,
  });

  return {restaurantDetails, isLoading};
};

export const useGetRestaurantOrders = () => {
  const {getAccessTokenSilently} = useAuth0();

  const getOrders = async (): Promise<Order> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.get("/orders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  const {data: orders, isLoading} = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    retry: 1,
  });

  return {orders, isLoading};
};
