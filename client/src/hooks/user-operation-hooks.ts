import {axiosReq} from "@/lib/http";
import {RestaurantDataType, RestaurantSearchResponse} from "@/lib/types";
import {SearchState} from "@/pages/SearchPage";
import {useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOption", searchState.sortOption);
      const response = await axiosReq.get(
        `/op/search/${city}?${params.toString()}`
      );
      return response.data;
    };

  const {data: foundRestaurants, isLoading} = useQuery({
    queryKey: ["foundRestaurants", searchState],
    queryFn: searchRestaurantRequest,
    retry: 1,
    enabled: !!city,
  });

  return {foundRestaurants, isLoading};
};

export const useGetRestaurantDetails = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<RestaurantDataType> => {
    const response = await axiosReq(`/op/${restaurantId}`);
    return response.data;
  };
  const {
    data: restaurantDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Restaurant"],
    queryFn: getRestaurantRequest,
    enabled: !!restaurantId,
  });
  if (isError && error) {
    console.log(error);
    toast.error("Couldnt get restaurant details");
  }

  return {restaurantDetails, isLoading};
};
