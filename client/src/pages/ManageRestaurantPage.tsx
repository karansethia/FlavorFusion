import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

import {
  useGetRestaurant,
  useRegisterVendor,
  useUpdateVendor,
} from "@/hooks/vendor-hooks";

const ManageRestaurantPage = () => {
  const {registerVendor, isPending} = useRegisterVendor();
  const {restaurantDetails, isLoading} = useGetRestaurant();
  const {updateVendor, isPending: isUpdating} = useUpdateVendor();
  const isEditing = !!restaurantDetails;
  return (
    <>
      {!isLoading && (
        <ManageRestaurantForm
          onSave={isEditing ? updateVendor : registerVendor}
          isLoading={isPending || isUpdating}
          restaurant={restaurantDetails}
        />
      )}
      {isLoading && <p>Loading</p>}
    </>
  );
};

export default ManageRestaurantPage;
