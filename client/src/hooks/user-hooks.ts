import {axiosReq} from "@/lib/http";
import {UserDataType} from "@/lib/types";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

type RegisterUserRequestType = {
  auth0Id: string;
  email: string;
  name: string;
};

/**
 * A custom hook for handling registration
 * */
export const useRegisterNewUser = () => {
  console.log("inside hook");
  const {getAccessTokenSilently} = useAuth0();
  const registerNewUser = async (user: RegisterUserRequestType) => {
    console.log("inside registerUser");
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.post(
      "/user",
      {...user},
      {headers: {Authorization: `Bearer ${accessToken}`}}
    );
    console.log(response.data);
    console.log(response.headers);
  };
  const {
    mutateAsync: registerUser,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: registerNewUser,
  });
  return {
    registerUser,
    isPending,
    isError,
    isSuccess,
  };
};
type updateUserRequestDataType = {
  name: string;
  addressLine: string;
  city: string;
  postalCode: number;
  country: string;
};
/**
 * A custom hook for handling update in user details
 * */

export const useUpdateUser = () => {
  const {getAccessTokenSilently} = useAuth0();
  const updateUserRequest = async (formData: updateUserRequestDataType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.put(
      "/user",
      {...formData},
      {headers: {Authorization: `Bearer ${accessToken}`}}
    );
    if (response.status === 404 || response.status === 500) {
      throw new Error("Failed to update user");
    }
    return response.data;
  };
  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
    reset,
    isSuccess,
  } = useMutation({
    mutationFn: updateUserRequest,
  });

  if (isSuccess) {
    toast.success("Updated Successfully");
  }
  if (isError && error) {
    toast.error("Something went wrong");
    reset();
  }
  return {updateUser, isPending, isError, error, reset, isSuccess};
};

/**
 * A custom hook for getting user details
 * */
export const useGetUserDetails = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getUserDetailRequest = async (): Promise<UserDataType> => {
    const accessToken = await getAccessTokenSilently();
    const response = await axiosReq.get("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 403 || response.status === 500) {
      throw new Error("A error occurred");
    }
    return response.data;
  };
  const {
    data: currentUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetailRequest,
  });
  if (error && isError) {
    toast.error(error.message);
  }
  return {
    currentUser,
    isLoading,
  };
};
