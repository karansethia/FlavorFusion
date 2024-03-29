import {useAuth0} from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button} from "./ui/button";
import LoadingButton from "./LoadingButton";
import {Dialog, DialogTrigger, DialogContent} from "./ui/dialog";

import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import {useGetUserDetails} from "@/hooks/user-hooks";

type CheckoutButtonProps = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({onCheckout, disabled}: CheckoutButtonProps) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const {currentUser, isLoading: isGetUserLoading} = useGetUserDetails();
  // this function redirects back to the restaurant details page that we were on
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  const {pathname} = useLocation();
  if (!isAuthenticated) {
    return (
      <Button
        className="bg-orange-500 flex-1"
        onClick={onLogin}
        disabled={disabled}
      >
        Login to checkout
      </Button>
    );
  }
  if (isAuthLoading || !currentUser) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 flex-1">Go to checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[45px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
