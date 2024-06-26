import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import {UserDataType} from "@/lib/types";
import {useEffect} from "react";
import {ReceiptIndianRupee} from "lucide-react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z
    .string()
    .min(1, "Postal Code is required")
    .transform((v) => Number(v) || 0),
});

export type UserFormData = z.infer<typeof formSchema>;
type UserProfileFormProps = {
  currentUser: UserDataType;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  title = "User Profile",
  buttonText = "Submit",
  currentUser = {
    email: "",
    name: "",
    addressLine: "",
    city: "",
    postalCode: 123,
    country: "",
  },
}: UserProfileFormProps) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  // updating user details in the form everytime user gets updated
  useEffect(() => {
    const formReset = () => {
      form.reset(currentUser);
    };
    formReset();
  }, [form, currentUser]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="mx-5 px-5 md:mx-10 shadow-md my-5 space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h3 className="text-2xl font-bold flex flex-row items-center gap-2">
            {title === "Checkout" && <ReceiptIndianRupee />}
            {title}
          </h3>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-xs">Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-xs">Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine"
          render={({field}) => (
            <FormItem className="flex-1">
              <FormLabel className="text-xs">Address Line</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs">City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs">Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel className="text-xs">Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
