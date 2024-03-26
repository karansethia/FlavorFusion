import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import {useSearchRestaurant} from "@/hooks/user-operation-hooks";
import {useParams} from "react-router-dom";
import {useState} from "react";
import SearchBar, {SearchFormDataType} from "@/components/SearchBar";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const {city} = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const {foundRestaurants, isLoading} = useSearchRestaurant(searchState, city);

  const setQueryHandler = (serachFormData: SearchFormDataType) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: serachFormData.searchQuery,
    }));
  };

  const resetSearchHandler = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return <span>Loading</span>;
  }
  if (!foundRestaurants?.results || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 px-10">
      <div id="cuisines-list">Insert cuisines here</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setQueryHandler}
          placeholder="Search by cuisine or Restautant name"
          onReset={resetSearchHandler}
        />
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
