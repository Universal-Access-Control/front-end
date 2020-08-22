import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;
