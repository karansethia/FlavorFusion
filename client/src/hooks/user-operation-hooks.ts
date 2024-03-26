import {axiosReq} from "@/lib/http";
import {RestaurantSearchResponse} from "@/lib/types";
import {SearchState} from "@/pages/SearchPage";
import {useQuery} from "@tanstack/react-query";

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
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
