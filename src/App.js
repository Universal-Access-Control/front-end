// React
import React, { lazy, Suspense } from 'react';

// React-Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Tailwind
import tw, { theme, styled } from 'twin.macro';

// Styled-Components
import { createGlobalStyle } from 'styled-components';

// React-Spinkit
import Spinner from 'react-spinkit';

// Main core
import DashboardLayout from 'components/dashboard-layout';

const Statistic = lazy(() => import('components/statistic/page'));
const Devices = lazy(() => import('components/devices/list-page'));

// ==================================
const GlobalStyles = createGlobalStyle`
  .ReactModal__Overlay {
    ${tw`bg-gray-700! bg-opacity-75!`}
  }
`;
const PageLoading = styled(Spinner)`
  ${tw`flex justify-center p-4 mt-10`}
  & > div {
    ${tw`w-10 h-10`}
  }
`;

const AppRoute = ({ Component, Layout, ...routerProps }) => (
  <Route
    {...routerProps}
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
      <Switch>
        <AppRoute exact path="/devices" Component={Devices} Layout={DashboardLayout} />
        <AppRoute exact path="/" Component={Statistic} Layout={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
