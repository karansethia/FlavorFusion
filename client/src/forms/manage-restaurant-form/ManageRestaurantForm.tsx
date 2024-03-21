import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {z} from "zod";
import DetailsSection from "./sections/DetailsSection";
import {Separator} from "@/components/ui/separator";
import CuisinesSection from "./sections/CuisinesSection";
import MenuSection from "./sections/MenuSection";
import ImageSections from "./sections/ImageSections";
import LoadingButton from "@/components/LoadingButton";
import {Button} from "@/components/ui/button";
import {RestaurantDataType} from "@/lib/types";
import {useEffect} from "react";

const formSchema = z
  .object({
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
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: "Image is required"}).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

type RestaurantFormDataType = z.infer<typeof formSchema>;

type ManageRestaurantFormProps = {
  restaurant?: RestaurantDataType;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({
  onSave,
  isLoading,
  restaurant,
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

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    form.reset(restaurant);
  }, [form, restaurant]);

  const submitHandler = (formDataJson: RestaurantFormDataType) => {
    //todo convert formDataJson to new FormData object
    console.log(formDataJson);

    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);

    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    for (const value of formData.values()) {
      console.log(value);
    }
    onSave(formData);
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
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSections />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
