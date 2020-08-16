// React
import React, { lazy, Suspense } from 'react';

// React-Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Tailwind
import tw, { theme, styled } from 'twin.macro';

// React-Spinkit
import Spinner from 'react-spinkit';

// Main core
import DashboardLayout from 'components/dashboard-layout';

const Dashboard = lazy(() => import('pages/dashboard'));
const Devices = lazy(() => import('pages/devices'));

// ==================================
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
      <Switch>
        <AppRoute exact path="/devices" Component={Devices} Layout={DashboardLayout} />
        <AppRoute exact path="/" Component={Dashboard} Layout={DashboardLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
