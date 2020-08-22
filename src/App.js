// React
import React, { Fragment, lazy, Suspense } from 'react';

// React-Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Tailwind
import tw, { theme, styled } from 'twin.macro';

// Styled-Components
import { createGlobalStyle } from 'styled-components';

// React-Spinkit
import Spinner from 'react-spinkit';

// React-toastify
import { ToastContainer } from 'react-toastify';

// Main core
import DashboardLayout from 'components/dashboard-layout';
import AuthLayout from 'components/auth/layout';

const Register = lazy(() => import('components/auth/register-page'));
const Login = lazy(() => import('components/auth/login-page'));
const Statistic = lazy(() => import('components/statistic/statistic-page'));
const Devices = lazy(() => import('components/devices/list-page'));
const Profile = lazy(() => import('components/profile/profile-page'));
const Settings = lazy(() => import('components/settings/settings-page'));

// ==================================
const GlobalStyles = createGlobalStyle`
  .ReactModal__Overlay {
    ${tw`bg-gray-700! bg-opacity-75!`}
  }
`;
const PageLoading = styled(Spinner)`
  ${tw`flex justify-center flex-1 p-4 mt-10`}
  & > div {
    ${tw`w-10 h-10`}
  }
`;
const ToastContainerStyled = styled(ToastContainer)`
  .Toastify__toast {
    ${tw`rounded`}
  }
`;

const AppRoute = ({ Component, Layout = Fragment, ...routerProps }) => (
  <Route
    {...routerProps}
    exact
    render={(props) => (
      <Layout>
        <Suspense fallback={<PageLoading name="pulse" color={theme`colors.gray.600`} />}>
          <Component {...props} />
        </Suspense>
      </Layout>
    )}
  />
);

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ToastContainerStyled />
      <Switch>
        <AppRoute path="/login" Component={Login} Layout={AuthLayout} />
        <AppRoute path="/register" Component={Register} Layout={AuthLayout} />
        <AppRoute path="/devices" Component={Devices} Layout={DashboardLayout} />
        <AppRoute path="/profile" Component={Profile} Layout={DashboardLayout} />
        <AppRoute path="/settings" Component={Settings} Layout={DashboardLayout} />
        <AppRoute path="/" Component={Statistic} Layout={DashboardLayout} />
        <Route path="*">
          <div>404 NOT FOUND</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
