import {axiosReq} from "@/lib/http";
import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "@tanstack/react-query";

type RegisterUserRequestType = {
  auth0Id: string;
  email: string;
  name: string;
};

/**
 * A custom hook for handling registration
 * @params
 * @returns
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
    mutate: registerUser,
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
