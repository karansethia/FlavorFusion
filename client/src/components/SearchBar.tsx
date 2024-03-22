import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem} from "./ui/form";
import {Search} from "lucide-react";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

export type SearchFormDataType = z.infer<typeof formSchema>;

type SearchBarProps = {
  onSubmit: (formData: SearchFormDataType) => void;
  placeholder: string;
  onReset?: () => void;
};

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Some search query is required",
  }),
});

const SearchBar = ({onSubmit, placeholder, onReset}: SearchBarProps) => {
  const form = useForm<SearchFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });
  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-2xl p-2 mx-5 ${
          form.formState.errors.searchQuery && "border-red-600"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({field}) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="rounded-xl"
          >
            Clear
          </Button>
        )}
        <Button type="submit" className="rounded-xl bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
