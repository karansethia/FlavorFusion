import {axiosReq} from "@/lib/http";
import {RestaurantDataType} from "@/lib/types";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "@tanstack/react-query";
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
