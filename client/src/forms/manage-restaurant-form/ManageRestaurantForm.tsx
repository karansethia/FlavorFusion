import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {z} from "zod";
import DetailsSection from "./sections/DetailsSection";
import {Separator} from "@/components/ui/separator";
import CuisinesSection from "./sections/CuisinesSection";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required",
  }),
  city: z.string({
    required_error: "City name is required",
  }),
  country: z.string({
    required_error: "Country name is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery is required",
    invalid_type_error: "Must be a valid num",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Delivery Time is required",
    invalid_type_error: "Must be a valid num",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Select atleast one cuisine you'd serve",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required"),
    })
  ),
  imageFile: z.instanceof(File, {message: "Image is required"}),
});

type RestaurantFormDataType = z.infer<typeof formSchema>;

type ManageRestaurantFormProps = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({
  onSave,
  isLoading,
}: ManageRestaurantFormProps) => {
  const form = useForm<RestaurantFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });

  const submitHandler = (formDataJson: RestaurantFormDataType) => {
    //todo convert formDataJson to new FormData object
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg m-10 shadow-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
