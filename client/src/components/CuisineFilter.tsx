import {cuisineList} from "@/config/restaurant-config";
import {Label} from "./ui/label";
import {Check, ChevronDown, ChevronUp} from "lucide-react";
import {ChangeEvent} from "react";
import {Button} from "./ui/button";

type CuisineFilterProps = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpendedClick: () => void;
};

const CuisineFilter = ({
  isExpanded,
  onExpendedClick,
  onChange,
  selectedCuisines,
}: CuisineFilterProps) => {
  const cuisineResetHandler = () => onChange([]);
  const cuisineChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;
    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
        <div
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
          onClick={cuisineResetHandler}
        >
          Reset Filter
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, index) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={index}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={cuisineChangeHandler}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-md px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-500 text-green-500"
                      : "border border-slate-500"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant="link"
          className="mt-4 flex-1"
          onClick={onExpendedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              {" "}
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
