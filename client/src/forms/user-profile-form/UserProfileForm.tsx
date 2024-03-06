import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.number().min(1, "Country is required"),
});

type UserFormData = z.infer<typeof formSchema>;
type UserProfileFormProps = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({onSave, isLoading}: UserProfileFormProps) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
  });
  return <div>{/* Your component code here */}</div>;
};

export default UserProfileForm;
