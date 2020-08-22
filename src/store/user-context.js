// React
import React, { createContext, useState } from 'react';

// ======================================
export const UserContext = createContext({
  user: {},
  updateUser: () => {},
});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);

  function updateUser(newUser) {
    setUser(newUser);
  }

  return <UserProvider value={{ user, updateUser }}>{children}</UserProvider>;
};

export default UserContextWrapper;
