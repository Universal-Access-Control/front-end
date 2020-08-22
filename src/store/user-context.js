// React
import React, { createContext, useState, useRef, useEffect } from 'react';

// Apollo
import { useLazyQuery } from '@apollo/client';

// Main core
import { GET_USER_QUERY } from 'gql/user-gql';

// ======================================
export const UserContext = createContext({
  user: {},
  getUser: () => {},
  updateUser: () => {},
});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

const UserContextWrapper = ({ children }) => {
  const RETRY_TIME = useRef(0);
  const [user, setUser] = useState(null);
  const [fetchUser, { called, loading, data, error, client, stopPolling, startPolling }] = useLazyQuery(GET_USER_QUERY);

  useEffect(() => {
    if (!called && error && !RETRY_TIME.current) {
      RETRY_TIME.current = 5000;
      startPolling(RETRY_TIME.current);
    } else if (called && !error) {
      RETRY_TIME.current = 0;
      stopPolling();
    }

    return () => {
      client && client.stop();
    };
  }, [error, startPolling, stopPolling, client, called]);

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data]);

  function getUser() {
    if (!loading || !error) {
      fetchUser();
    }
  }

  function updateUser(newUser) {
    setUser(newUser);
  }

  return <UserProvider value={{ user, updateUser, getUser }}>{children}</UserProvider>;
};

export default UserContextWrapper;
