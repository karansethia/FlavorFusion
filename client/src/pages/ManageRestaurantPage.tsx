import OrderItemCard from "@/components/OrderItemCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

import {
  useGetRestaurant,
  useGetRestaurantOrders,
  useRegisterVendor,
  useUpdateVendor,
} from "@/hooks/vendor-hooks";

const ManageRestaurantPage = () => {
  const {registerVendor, isPending} = useRegisterVendor();
  const {restaurantDetails, isLoading} = useGetRestaurant();
  const {updateVendor, isPending: isUpdating} = useUpdateVendor();
  const {orders, isLoading: isOrderLoading} = useGetRestaurantOrders();
  const isEditing = !!restaurantDetails;
  return (
    <Tabs defaultValue="orders" className="m-8">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-semibold">
          Active Orders : {orders?.length}
        </h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateVendor : registerVendor}
          isLoading={isPending || isUpdating}
          restaurant={restaurantDetails}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
