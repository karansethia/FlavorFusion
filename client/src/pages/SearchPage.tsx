import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import {useSearchRestaurant} from "@/hooks/user-operation-hooks";
import {useParams} from "react-router-dom";

const SearchPage = () => {
  const {city} = useParams();
  const {foundRestaurants, isLoading} = useSearchRestaurant(city);
  if (isLoading) {
    return <span>Loading</span>;
  }
  if (!foundRestaurants?.results || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">Insert cuisines here</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo
          total={foundRestaurants!.pagination.total}
          city={city}
        />
        {foundRestaurants.results.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
