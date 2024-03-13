import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import {useGetUserDetails, useUpdateUser} from "@/hooks/user-hooks";

const UserProfilePage = () => {
  const {updateUser, isPending} = useUpdateUser();
  const {currentUser, isLoading} = useGetUserDetails();

  //todo : create a state for auth0Id and get user data through route loaders
  // const userData = useLoaderData();
  // console.log(userData);

  return (
    <>
      {!isLoading && (
        <UserProfileForm
          currentUser={currentUser!}
          buttonText="Update"
          isLoading={isPending}
          onSave={updateUser}
        />
      )}
      {isLoading && <p>Loading</p>}
    </>
  );
};

export default UserProfilePage;

// export const userDetailLoader = async () => {

//   const response = await axiosReq.get("/user", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   if (response.status === 403 || response.status === 500) {
//     throw new Error("A error occurred");
//   }
//   return response.data as UserDataType;
// };
