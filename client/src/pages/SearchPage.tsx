import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import {useSearchRestaurant} from "@/hooks/user-operation-hooks";
import {useParams} from "react-router-dom";
import {useState} from "react";
import SearchBar, {SearchFormDataType} from "@/components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import CuisineFilter from "@/components/CuisineFilter";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};

const SearchPage = () => {
  const {city} = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {foundRestaurants, isLoading} = useSearchRestaurant(searchState, city);

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines,
      page: 1,
    }));
  };

  const setQueryHandler = (serachFormData: SearchFormDataType) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: serachFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearchHandler = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }));
  };
  const setPageHandler = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
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
      <div id="cuisines-list">
        <CuisineFilter
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpendedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
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
        {foundRestaurants.results.map((restaurant, index) => (
          <SearchResultCard restaurant={restaurant} key={index} />
        ))}
        <PaginationSelector
          page={foundRestaurants.pagination.page}
          pages={foundRestaurants.pagination.pages}
          onPageChange={setPageHandler}
        />
      </div>
    </div>
  );
};

export default SearchPage;
