// React
import React from 'react';
import ReactDOM from 'react-dom';

// Apollo
import { ApolloProvider } from '@apollo/client';

// Main core
import App from './App';
import apolloClient from './services/apollo';

// CSS styles
import 'tailwindcss/dist/base.min.css';

// ==================================================
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
