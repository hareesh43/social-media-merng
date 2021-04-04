import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
// import {createHttpLink} from '@apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks'


import App from './App'



const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache()
});


export default(
    <ApolloProvider client = {client}>
        <App />
    </ApolloProvider>
)
