const apiUrl = import.meta.env.VITE_API_BASE_URL;
import {axiosReq} from "@/lib/http";
import {useMutation} from "@tanstack/react-query";

type RegisterUserRequestType = {
  auth0Id: string;
  email: string;
  name: string;
};

export const useRegisterNewUser = () => {
  const registerNewUser = async (user: RegisterUserRequestType) => {
    const response = await axiosReq.post("/user", {...user});
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
