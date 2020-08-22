// React
import React from 'react';
import ReactDOM from 'react-dom';

// Apollo
import { ApolloProvider } from '@apollo/client';

// Main core
import App from 'App';
import apolloClient from 'services/apollo';
import UserContextWrapper from 'store/user-context';

// CSS styles
import 'tailwindcss/dist/base.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

// ==================================================
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <UserContextWrapper>
        <App />
      </UserContextWrapper>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
