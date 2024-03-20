import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import {useRegisterVendor} from "@/hooks/vendor-hooks";

const ManageRestaurantPage = () => {
  const {registerVendor, isPending} = useRegisterVendor();
  return <ManageRestaurantForm onSave={registerVendor} isLoading={isPending} />;
};

export default ManageRestaurantPage;
