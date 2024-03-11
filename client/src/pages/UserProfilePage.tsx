import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  return (
    <UserProfileForm buttonText="Update" isLoading={false} onSave={() => {}} />
  );
};

export default UserProfilePage;
