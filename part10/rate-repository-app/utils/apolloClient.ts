import { getAccessToken } from "@/reducers/authReducer";
import { AppDispatch } from "@/store";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const createApolloClient = (dispatch: AppDispatch) => {
  const httpLink = new HttpLink({ uri: "http://192.168.1.41:4000" });

  const authLink = setContext(async (_, { headers }) => {
    const acessToken = await dispatch(getAccessToken());

    return {
      headers: {
        ...headers,
        authorization: acessToken ? `Bearer ${acessToken.token}` : "",
      },
    };
  });

  const link = ApolloLink.from([authLink, httpLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
