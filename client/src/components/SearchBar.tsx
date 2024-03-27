import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem} from "./ui/form";
import {Search} from "lucide-react";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {useEffect} from "react";

export type SearchFormDataType = z.infer<typeof formSchema>;

type SearchBarProps = {
  onSubmit: (formData: SearchFormDataType) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

const SearchBar = ({
  onSubmit,
  placeholder,
  onReset,
  searchQuery,
}: SearchBarProps) => {
  const form = useForm<SearchFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery ? searchQuery : "",
    },
  });

  useEffect(() => {
    form.reset({searchQuery});
  }, [form, searchQuery]);

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
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-xl p-2 ${
          form.formState.errors.searchQuery && "border-red-500"
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
                  className="border-none shadow-none text-lg focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="rounded-xl"
        >
          Reset
        </Button>

        <Button type="submit" className="rounded-xl bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
