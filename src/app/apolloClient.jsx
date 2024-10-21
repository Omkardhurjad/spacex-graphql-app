// src/app/apolloClient.jsx
"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/', 
  cache: new InMemoryCache(),
});


export const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
