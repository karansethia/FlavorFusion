import {axiosReq} from "@/lib/http";
import {RestaurantSearchResponse} from "@/lib/types";
import {useQuery} from "@tanstack/react-query";

export const useSearchRestaurant = (city?: string) => {
  const searchRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const response = await axiosReq.get(`/op/search/${city}`);
      return response.data;
    };

  const {data: foundRestaurants, isLoading} = useQuery({
    queryKey: ["foundRestaurants"],
    queryFn: searchRestaurantRequest,
    retry: 1,
    enabled: !!city,
  });

  return {foundRestaurants, isLoading};
};
