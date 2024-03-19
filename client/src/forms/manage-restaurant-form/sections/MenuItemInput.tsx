import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useFormContext} from "react-hook-form";

type MenuItemInputProps = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({index, removeMenuItem}: MenuItemInputProps) => {
  const {control} = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Chowmein samosa"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items center gap-1">
              Price <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="25" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-400 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
