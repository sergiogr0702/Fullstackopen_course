import { AUHTENTICATE_USER } from "@/graphql/mutations";
import {
  AccessToken,
  AuthenticateUserResponse,
  AuthenticateUserVariables,
} from "@/types";
import { ApolloError, useMutation } from "@apollo/client";
import { setAccessToken } from "@/reducers/authReducer";
import { useAppDispatch } from "./useAppDispatch";

const useSignIn = () => {
  const [authenticateUser, { data, loading, error }] = useMutation<
    AuthenticateUserResponse,
    AuthenticateUserVariables
  >(AUHTENTICATE_USER);
  const dispatch = useAppDispatch();

  const signIn = async (username: string, password: string) => {
    try {
      const response = await authenticateUser({
        variables: { credentials: { username, password } },
      });
      const accessToken = response.data?.authenticate.accessToken;
      const expiration = response.data?.authenticate.expiresAt;
      if (accessToken && expiration) {
        const newToken: AccessToken = {
          token: accessToken,
          expiresAt: new Date(expiration),
        };
        await dispatch(setAccessToken(newToken));
        return response.data;
      } else {
        throw new Error("Failed to authenticate user");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("ApolloError:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
      throw error;
    }
  };

  return {
    signIn,
    loading,
    error,
    data,
  };
};

export default useSignIn;
